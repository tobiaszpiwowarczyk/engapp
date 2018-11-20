import { AbstractControl, ValidationErrors } from "@angular/forms";

/**
 * The class structure for color validation
 */
export class ColorValidator {

  private static readonly COLOR_REGEX: RegExp = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/g;

  /**
   * Method for color validation.
   * You must put color only in HEX format
   * for example: #fff, #d0d0d0
   * 
   * @param c {@link AbstractControl} - input to validate
   * @return {null} if the color is valid,
   *             otherwise returns {@link ValidationErrors} object
   */
  public static validate(c: AbstractControl): ValidationErrors {
    return ColorValidator.COLOR_REGEX.test(c.value) ? null : { color: true };
  }

}