import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitMark',
  pure: false
})
export class UnitMarkPipe implements PipeTransform {
  transform(input: string, value: string): any {
    if(value == null || value.trim() == "") return input;
    return input.replace(new RegExp(`^(${value})`, "g"), "<b>$1</b>");
  }
}