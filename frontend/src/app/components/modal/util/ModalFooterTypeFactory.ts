import { ModalFooterType } from './ModalFooterType';

export class ModalFooterTypeFactory {

  public static getModalFooterType(type: string): ModalFooterType {
    switch(type) {
      case "ok-cancel": return ModalFooterType.OK_CANCEL;
      case "yes-no": return ModalFooterType.YES_NO;
      default: throw new Error("Incorrect modal type " + type);
    }
  }

}