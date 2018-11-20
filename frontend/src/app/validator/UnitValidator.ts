import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { UnitService } from '../services/unit/unit.service';
import { Unit } from "../modules/main/home/components/unit/Unit";

export class UnitValidator {

  /**
   * Validates unit name syntax
   * Sample valid unit names: Unit, Sample, Example
   * 
   * @param c {@link AbstractControl} - validated control
   * @returns null if input value is valid,
   *          otherwise returns object with unitRegex property
   */
  public static validateName(c: AbstractControl): ValidationErrors {
    const nameRegex: RegExp = /^[A-Z\Ć\Ś\Ż\Ź\Ł\Ó][a-z\ą\ę\ć\ż\ź\ń\ł\ó\ś]+(\s?[a-z\ą\ę\ć\ż\ź\ń\ł\ó\ś])*$/g;
    return nameRegex.test(c.value) ? null : { unitRegex: true };
  }


  /**
   * Method for unit existence by its name
   *
   * @param us {@link UnitService} - the unit service, it is required
   * @returns {@link AsyncValidatorFn} - validation result
   */
  public static validateAddition(us: UnitService): AsyncValidatorFn {
    return (c: AbstractControl) => new Promise(res => {
      setTimeout(() => {
        us.addUnitValidation(new Unit({ name: c.value }), "name")
          .subscribe(() => res(null), () => c.setErrors({ unitTaken: true }));
      }, 500);
    });
  }



  /**
   * Method for unit non existence by its name
   *
   * @param us {@link UnitService} - the unit service, it is required
   * @returns {@link AsyncValidatorFn} - validation result
   */
  public static validateEdition(us: UnitService, unitId: string): AsyncValidatorFn {
    return (c: AbstractControl) => new Promise(res => {
      setTimeout(() => {
        us.editUnitValidation(new Unit({ id: unitId, name: c.value }), "name")
          .subscribe(() => res(null), () => c.setErrors({ unitTaken: true }));
      }, 500);
    });
  }

}
