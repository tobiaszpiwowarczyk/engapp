import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstError'
})
export class FirstErrorPipe implements PipeTransform {

  transform(value: any): any {
    const keys = Object.keys(value || {});
    return (keys && keys.length > 0) ? keys[0] : null;
  }

}
