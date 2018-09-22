import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordExcept'
})
export class QuizMultipleWordExceptPipe implements PipeTransform {
  transform(value: string[], word: string): any {
    return value.filter(x => x != word);
  }
}