import { Pipe, PipeTransform } from '@angular/core';
import { Word } from '../../../../main/quiz/services/word/Word';

@Pipe({
  name: 'unitFilter'
})

export class UnitFilterPipe implements PipeTransform {
  transform(words: Word[], value: string): any {

    if(value == null || value.trim() == "") {
      return words;
    }

    return words.filter(word => word.polish.toLowerCase().startsWith(value.toLowerCase())
    || word.english.toString().toLowerCase().startsWith(value.toLowerCase()));
  }
}