import { AsyncValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../services/user/User';
import { LoginService } from '../services/login/login.service';

export class UsernameValidator {
  public static validate(s: UserService): AsyncValidatorFn {
    return (c: FormControl) => {
      return new Promise(resolve => {
        setTimeout(() => {
          s.validateRegister(new User({username: c.value}), "username")
            .subscribe(() => resolve(null), () => c.setErrors({usernameTaken: true}));
        }, 500);
      });
    };
  }

  public static checkExistence(s: UserService, ls: LoginService): AsyncValidatorFn {
    return (c: FormControl) => {
      return new Promise(resolve => {
        setTimeout(() => {
          const user: User = ls.getUser();
          s.validateUpdateUser(new User({id: user.id, email: user.email, username: c.value}), "username")
            .subscribe(() => resolve(null), () => c.setErrors({usernameTaken: true}));
        }, 500);
      });
    };
  }
}