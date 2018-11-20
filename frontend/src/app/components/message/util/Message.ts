import { IMessage } from "./MessageType";

export interface Message {
  id?: number;
  type: IMessage;
  text: string;
  shown: boolean;
}