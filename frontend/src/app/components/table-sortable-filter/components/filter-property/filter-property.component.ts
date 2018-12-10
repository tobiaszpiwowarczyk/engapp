import { Component, OnInit, Input } from '@angular/core';
import { FilterProperty, TableSortableService } from '../../services/table-sortable.service';

@Component({
  selector: 'app-filter-property',
  templateUrl: './filter-property.component.html',
  styleUrls: ['./filter-property.component.scss']
})
export class FilterPropertyComponent implements OnInit {

  @Input() property: FilterProperty;

  constructor(
    private tss: TableSortableService
  ) { }
  ngOnInit() { }

  public removeProperty(): void {
    this.tss.removeFilterProperty(this.property);
  }

}
