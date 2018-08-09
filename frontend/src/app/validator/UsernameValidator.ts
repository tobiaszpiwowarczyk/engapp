import { AsyncValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../services/user/User';

export class UsernameValidator {
  public static validate(s: UserService): AsyncValidatorFn {
    return (c: FormControl) => {
      return new Promise(resolve => {
        setTimeout(() => {
          s.validateRegister(new User({username: c.value}), "username").subscribe(() => resolve(null), () => {
            c.setErrors({usernameTaken: true});
          });
        }, 500);
      });
    };
  }
}