import { ErrorMessage } from './ErrorMessage';

export class ErrorMessages {

  /**
   * The message for 'required' error type
   */
  public static readonly REQUIRED: ErrorMessage = { type: "required", message: "To pole jest wymagane" };


  /**
   * The message for firstname and lastname syntax mistakes
   */
  public static readonly NAME_REGEX: ErrorMessage = {
    type: "nameRegex",
    message: "Pole musi się składać z pierwszej dużej litery i z małych liter"
  };



  /**
   * The message for email invalid syntax
   */
  public static readonly EMAIL_REGEX: ErrorMessage = { type: "emailRegex", message: "Adres e-mail jest nieprawidłowy" };



  /**
   * The message for too short texts
   */
  public static readonly MIN_LENGTH: ErrorMessage = {
    type: "minlength",
    message: "To pole posiada <b>{0}</b> znaków. Musi zawierać conajmniej <b>{1}</b> znaków"
  };


  /**
   * The message for password if it isn't strong enough
   */
  public static readonly STRENGTH: ErrorMessage = {
    type: "strength",
    message: "Podane hasło jest za słabe. Musi zawierać cyfry, duże i małe litery a także znaki specjalne"
  };



  /**
   * The message for username existence error
   */
  public static readonly USERNAME_TAKEN: ErrorMessage = {
    type: "usernameTaken",
    message: "Użytkownik o podanej nazwie użytkownika już istnieje"
  };




  /**
   * The message for email existence error
   */
  public static readonly EMAIL_TAKEN: ErrorMessage = { type: "emailTaken", message: "Już istnieje konto z podanym adresem e-mail" };



  /**
   * The message for color invalid syntax
   */
  public static readonly COLOR: ErrorMessage = { type: "color", message: "Podana wartość koloru jest nieprawidłowa" };



  /**
   * The message for word existence error
   */
  public static readonly WORD_TAKEN: ErrorMessage = {
    type: "wordTaken",
    message: "To słówko już istnieje"
  };



  /**
   * The message for unit syntax mistake
   */
  public static readonly UNIT_REGEX: ErrorMessage = {
    type: "unitRegex",
    message: "Podana nazwa rozdziału musi się zacząć z dużej litery i nie może zawierać żadnych znaków specjalnych prócz spacji"
  };



  /**
   * The message for unit existence error
   */
  public static readonly UNIT_TAKEN: ErrorMessage = { type: "unitTaken", message: "Rozdział o podanej nazwie już istnieje" };
}