import { MessageType, IMessage } from './MessageType';

export class MessageTypeFactory {

  public static getInstance(input: string): IMessage {
    switch (input) {
      case "success":
        return MessageType.SUCCESS;
      case "warning":
        return MessageType.WARNING;
      case "danger":
        return MessageType.DANGER;
      default:
        throw new Error(`Nieznany typ wiadomości '${input}'!`);
    }
  }

}