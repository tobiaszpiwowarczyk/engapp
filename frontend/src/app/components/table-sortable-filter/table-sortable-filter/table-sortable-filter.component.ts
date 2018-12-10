import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import { FilterCriteria, FilterProperty, FilterValue, TableSortableService } from '../services/table-sortable.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SortDirection } from '../../../util/ArrayUtils';


@Component({
  selector: 'th[table-sortable-filter]',
  templateUrl: './table-sortable-filter.component.html',
  styleUrls: ['./scss/table-sortable-filter.component.scss']
})
export class TableSortableFilterComponent implements OnInit, AfterViewInit {

  @Input("table-sortable-filter") column: string;

  enabled: boolean = false;
  sortDirection: SortDirection = SortDirection.ASC;
  sortActive: boolean = false;

  allSelected: boolean = true;
  filtered: boolean = false;
  filterOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  filterSearchCriteria: string = "";
  filterValues: FilterValue[] = [];
  filterProperty: FilterProperty;



  constructor(
    private tss: TableSortableService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.filterOpened.subscribe(res => {
      if(!res) this.filterSearchCriteria = "";
    });
  }

  ngAfterViewInit() {
    this.filterProperty = {
      name: this.column,
      text: this.el.nativeElement.querySelector(".table-sortable-filter__text").textContent.trim()
    };


    this.tss.enabled.subscribe(res => {
      this.enabled = res;

      if(!res) {
        this.closeFilter();
        this.sortActive = false;
        this.filtered = false;
        this.allSelected = true;
      }
      else {

        this.tss.retrieveFilterOptions(this.column)
          .subscribe(x => {
            this.filterValues = x;
            this.allSelected = this.filterValues.filter(y => y.selected).length == this.filterValues.length;
          });

        this.tss.sortActive.subscribe(x => this.sortActive = x == this.column);

        this.tss.filterCriteria
          .map((x: FilterCriteria[]) => x.map(y => y.property))
          .subscribe((props: FilterProperty[]) => {
            this.filtered = props.indexOf(this.filterProperty) != -1;
          });
      }
    });

  }


  public sort(): void {
    this.sortDirection = this.sortDirection == SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;

    this.tss.sortData(this.filterProperty, this.sortDirection);

  }

  public openFilter = (): void => this.filterOpened.next(!this.filterOpened.getValue());

  public filterData(): void {
    this.tss.filterData(this.filterProperty, this.filterValues);
    this.closeFilter();
  }


  public toggleAll(): void {
    this.filterValues.forEach(p => p.selected = !this.allSelected);
    this.allSelected = !this.allSelected;
  }

  public toggleSelectedOption(value: any) {
    this.filterValues[this.filterValues.map(x => x.value).indexOf(value)].selected =
      !this.filterValues[this.filterValues.map(x => x.value).indexOf(value)].selected;

    if(this.filterValues.filter(x => x.selected).length < this.filterValues.length) {
      this.allSelected = false;
    }
    else this.allSelected = true;
  }



  private closeFilter = (): void => this.filterOpened.next(false);
}