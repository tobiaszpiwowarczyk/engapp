import { Pipe, PipeTransform } from '@angular/core';
import { FilterValue } from '../services/table-sortable.service';

@Pipe({
  name: 'optionsFilter'
})
export class TableSortableOptionsFilterPipe implements PipeTransform {
  transform(arr: FilterValue[], criteria: string): any {
    return criteria.length == 0 ? arr : arr.filter(x => x.value.toString().toLocaleLowerCase().startsWith(criteria.toLocaleLowerCase()));
  }
}