import { Directive, HostListener } from '@angular/core';
import { EventTargetUtils } from '../../../util/EventTargetUtils';
import { TableSortableFilterComponent } from '../table-sortable-filter/table-sortable-filter.component';

@Directive({ selector: '[closeable]' })
export class TableSortableFilterOptionsCloseableDirective {
  constructor(private c: TableSortableFilterComponent) { }

  @HostListener("window:click", ["$event"])
  public close(e): void {
    if(!EventTargetUtils.reachedTarget(e, "filter-option") && !EventTargetUtils.reachedTarget(e, "table-sortable-filter__content")) {
      this.c.filterOpened.next(false);
    }
  }

  @HostListener("window:keyup", ["$event"])
  public closeAfterKeyup(e): void {
    const keyCode: number = e.keyCode || e.which;

    if(keyCode == 27) {
      this.c.filterOpened.next(false);
    }
  }
}