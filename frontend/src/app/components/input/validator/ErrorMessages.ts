import { ErrorMessage } from './ErrorMessage';

export class ErrorMessages {
  public static readonly REQUIRED: ErrorMessage = new ErrorMessage({type: "required", message: "To pole jest wymagane"});
  public static readonly NAME_REGEX: ErrorMessage = new ErrorMessage(
    {type: "nameRegex", message: "Pole musi się składać z pierwszej dużej litery i z małych liter"}
  );

  public static readonly EMAIL_REGEX: ErrorMessage = new ErrorMessage({type: "emailRegex", message: "Adres e-mail jest nieprawidłowy"});
  public static readonly MIN_LENGTH: ErrorMessage = new ErrorMessage(
    {type: "minlength", message: "To pole posiada <b>{0}</b> znaków. Musi zawierać conajmniej <b>{1}</b> znaków"}
  );

  public static readonly STRENGTH: ErrorMessage = new ErrorMessage(
    {type: "strength", message: "Podane hasło jest za słabe. Musi zawierać cyfry, duże i małe litery a także znaki specjalne"}
  );

  public static readonly USERNAME_TAKEN: ErrorMessage = new ErrorMessage(
    {type: "usernameTaken", message: "Użytkownik o podanej nazwie użytkownika już istnieje"}
  );

  public static readonly EMAIL_TAKEN: ErrorMessage = new ErrorMessage(
    {type: "emailTaken", message: "Już istnieje konto z podanym adresem e-mail"}
  );

  public static readonly COLOR: ErrorMessage = new ErrorMessage(
    {type: "color", message: "Podana wartość koloru jest nieprawidłowa"}
  );
}