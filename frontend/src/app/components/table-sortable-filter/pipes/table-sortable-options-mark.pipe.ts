import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markOption'
})
export class TableSortableFilterMarkOptionPipe implements PipeTransform {
  transform(word: any, substring: string): any {
    if(substring == null || substring.trim() == "") return word;
    return word.toString().replace(new RegExp(`^(${substring})`, "g"), "<b>$1</b>");
  }
}