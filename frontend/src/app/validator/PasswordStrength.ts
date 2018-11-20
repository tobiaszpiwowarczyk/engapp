import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordStrength {

  private static readonly REG_EXS: RegExp[] = [
    /(?=.*[0-9]).*/g, /(?=.*[a-z]).*/g, /(?=.*[A-Z]).*/g, /(?=.*[!-/:-@\\[-`{-ÿ]).*/g, /(?=.*.{13}).*/g
  ];

  // todo: get more information about password strength
  public static validate(c: AbstractControl): ValidationErrors {
    return PasswordStrength.REG_EXS.filter(x => x.test(c.value)).length >= 4 ? null : { strength: true };
  }

}