
export class DropZoneState {
  state: string;
  message: string;
  isDragover: boolean;
  isInvalid: boolean;
  isValid: boolean;

  constructor(state: string, message: string) {
    this.state = state;
    this.message = message;

    this.isDragover = this.state == 'dragover';
    this.isInvalid = this.state == 'invalid';
    this.isValid = this.state == 'valid';
  }

}

export class DropZoneStates {

  public static readonly DEFAULT: DropZoneState = new DropZoneState("default", "Upuść plik tutaj");
  public static readonly DRAGOVER: DropZoneState = new DropZoneState("dragover", "Upuść plik tutaj");
  public static readonly FILE_COUNT: DropZoneState = new DropZoneState("invalid", "Możesz umieścić tylko jeden plik!");
  public static readonly INVALID_IMAGE: DropZoneState = new DropZoneState("invalid", "Możesz umieszczać tylko zdjęcia!");

}