import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NameValidator {
  public static validate(input: AbstractControl): ValidationErrors {
    return /^[A-Z][a-z]+$/g.test(input.value) ? null : {nameRegex: true};
  }

}