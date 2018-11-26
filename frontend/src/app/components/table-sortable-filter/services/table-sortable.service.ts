import { FilterProperty } from './table-sortable.service';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


export class FilterValue {
  value: string;
  selected: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export interface FilterProperty {
  name: string;
  text: string;
}


export interface FilterCriteria {
  property: FilterProperty;
  values: FilterValue[];
}

export enum SortDirection {
  ASC, DESC
}


@Injectable()
export class TableSortableService {

  private _enabled: boolean = false;
  enabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._enabled);

  private originalData: any[] = [];
  data: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  sortActive: BehaviorSubject<string> = new BehaviorSubject<string>("");

  filterCriteria: BehaviorSubject<FilterCriteria[]> = new BehaviorSubject<FilterCriteria[]>([]);




  constructor() {
    this.filterCriteria.subscribe((res: FilterCriteria[]) => {
      if(res.length == 0) {
        this.data.next(this.originalData);
      }
      else {
        res.forEach(x => {
          this.data.next(
            this.originalData.filter(data => x.values.filter(d => d.selected).map(y => y.value).includes(data[x.property.name]))
          );
        });
      }
    });
  }




  public toggleFilter(): void {
    this._enabled = !this._enabled;
    this.enabled.next(this._enabled);
    if(!this._enabled) {
      this.filterCriteria.next(this.filterCriteria.getValue().splice(0, this.filterCriteria.getValue().length - 1));
    }
  }



  public initData(data: any[]): void {
    this.originalData = data;
    this.data.next(data);
  }


  public retrieveFilterOptions(prop: string): Observable<FilterValue[]> {
    return this.data
      .map(x => x.map(a => a[prop]))
      .map(x => {
        const res = [];

        x.forEach(y => {
          if(res.indexOf(y) == -1) res.push(y);
        });

        return res;
      })
      .map(x => x.map(a => new FilterValue({ value: a, selected: true })));
  }


  public retrieveFilterProperties(): Observable<FilterProperty[]> {
    return this.filterCriteria.map((res: FilterCriteria[]) => res.map(x => x.property));
  }


  public filterData(filterProperty: FilterProperty, filterValues: FilterValue[]): void {

    if(!this.isPropertyFiltered(filterProperty)) {
      this.filterCriteria.getValue().push({
        property: filterProperty,
        values: filterValues
      });
    }

    this.filterCriteria.next(this.filterCriteria.getValue());
  }



  public sortData(prop: FilterProperty, direction: SortDirection): void {
    this.sortActive.next(prop.name);
    this.data.next(this.data.getValue()
      .sort((a, b) => {
        if(typeof a[prop.name] == "number" && typeof b[prop.name] == "number") {
          return direction == SortDirection.ASC
            ? a[prop.name] - b[prop.name]
            : b[prop.name] - a[prop.name]
        }
        else {
          return direction == SortDirection.ASC
            ? ('' + a[prop.name]).localeCompare(b[prop.name])
            : ('' + b[prop.name]).localeCompare(a[prop.name])
        }
      })
    );
  }



  public isPropertyFiltered(property: FilterProperty): boolean {
    return this.filterCriteria.getValue().map(x => x.property).filter(x => x == property).length > 0;
  }


  public removeFilterProperty(prop: FilterProperty): void {

    this.filterCriteria.getValue().splice(this.filterCriteria.getValue().map(x => x.property).indexOf(prop), 1);
    this.filterCriteria.next(this.filterCriteria.getValue());

  }
}
