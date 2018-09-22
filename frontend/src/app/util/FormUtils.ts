import { Word } from './../modules/main/quiz/services/word/Word';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export class FormUtils {

  public static wordToFormGroup(word: Word): FormGroup {
    const res: FormGroup = new FormGroup({});

    for(const key in word) {
      switch(word[key].constructor.name) {
        case "Number":
        case "String":
          res.addControl(key, new FormControl(word[key], Validators.required));
          break;
        case "Array":
          const arr: FormArray = new FormArray([]);
          word[key].forEach(w => arr.push(new FormControl(w, Validators.required)));
          res.addControl(key, arr);
          break;
      }
    }

    return res;
  }

}