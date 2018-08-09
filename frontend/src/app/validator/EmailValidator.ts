import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../services/user/User';

export class EmailValidator {
  public static validate(input: AbstractControl): ValidationErrors {
    return /^[a-zA-Z0-9\.\-\_]+@+[a-z]+\.+[a-z]{2,3}$/g.test(input.value) ? null : {emailRegex: true};
  }

  public static isUnique(s: UserService): AsyncValidatorFn {
    return (c: FormControl) => {
      return new Promise(resolve => {
        setTimeout(() => {
          s.validateRegister(new User({email: c.value}), "email").subscribe(() => resolve(null), () => {
            c.setErrors({emailTaken: true});
          });
        }, 500);
      });
    };
  }
}