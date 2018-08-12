import { ErrorMessage } from "./ErrorMessage";
import { ErrorMessages } from './ErrorMessages';

export class ErrorMessageFactory {

  /**
   * 
   * Method returns {@link ErrorMessage} object by its type
   * @param type {@link string} - the error type
   * @returns {@link ErrorMessage} type
   * @throws {@link Error} if error type is not recognized
   */
  public static getErrorMessage(type: string): ErrorMessage {
    switch(type) {
      case "required": return ErrorMessages.REQUIRED;
      case "nameRegex": return ErrorMessages.NAME_REGEX;
      case "emailRegex": return ErrorMessages.EMAIL_REGEX;
      case "minlength": return ErrorMessages.MIN_LENGTH;
      case "strength": return ErrorMessages.STRENGTH;
      case "usernameTaken": return ErrorMessages.USERNAME_TAKEN;
      case "emailTaken": return ErrorMessages.EMAIL_TAKEN;
      default: throw new Error(`Nierozpoznawalny typ wiadomości: "${type}".`);
    }
  }
}