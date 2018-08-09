import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordStrength {

  private static readonly REG_EXS: RegExp[] = [
    /(?=.*[0-9]).*/g, /(?=.*[a-z]).*/g, /(?=.*[A-Z]).*/g, /(?=.*[!-/:-@\\[-`{-ÿ]).*/g, /(?=.*.{13}).*/g
  ];

  private static getStrength(input: string): number {
    return PasswordStrength.REG_EXS.filter(x => x.test(input)).length;
  }

  // todo: get more information about password strength
  public static validate(c: AbstractControl): ValidationErrors {
    const reg: RegExp[] = [
      /(?=.*[0-9]).*/g, /(?=.*[a-z]).*/g, /(?=.*[A-Z]).*/g, /(?=.*[!-/:-@\\[-`{-ÿ]).*/g, /(?=.*.{13}).*/g
    ];
    return reg.filter(x => x.test(c.value)).length >= 4 ? null : {strength: true};
  }

}