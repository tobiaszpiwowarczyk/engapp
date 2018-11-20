
export class IMessage {
  icon: string;
  name: string;
}

export class MessageType {
  public static SUCCESS: IMessage = { icon: "check_circle", name: "success" };
  public static WARNING: IMessage = { icon: "warning", name: "warning" };
  public static DANGER: IMessage = { icon: "error", name: "danger" };
}