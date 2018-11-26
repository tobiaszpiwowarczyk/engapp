import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clearSpace'
})
export class TableSortaleOptionClearSpacePipe implements PipeTransform {
  transform(value: any): any {
    return value.toString().replace(" ", "-");
  }
}