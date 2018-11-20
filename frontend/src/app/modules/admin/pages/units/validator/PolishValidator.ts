import { WordService } from './../../../../../services/word/word.service';
import { AsyncValidatorFn, AbstractControl } from "@angular/forms";

export class PolishValidator {

  public static checkExistence(ws: WordService, unitId: string): AsyncValidatorFn {
    return (c: AbstractControl) => new Promise(resolve => {
      setTimeout(() => {
        ws.addWordValidation({ unitId: unitId, polish: c.value }, "polish")
          .subscribe(() => resolve(null), () => c.setErrors({ wordTaken: true }));
      }, 500);
    });
  }


  public static validatePolishEditing(ws: WordService, unitId: string, wordNumber: number): AsyncValidatorFn {
    return (c: AbstractControl) => new Promise(resolve => {
      setTimeout(() => {
        ws.editWordValidation({ unitId: unitId, wordNumber: wordNumber, polish: c.value }, "polish")
          .subscribe(() => resolve(null), (y) => {
            console.log(y);
            c.setErrors({ wordTaken: true });
          });
      }, 500);
    });
  }

}