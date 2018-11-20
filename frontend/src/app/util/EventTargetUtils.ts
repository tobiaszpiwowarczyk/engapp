
export class EventTargetUtils {

  public static reachedTarget(evt, className: string): boolean {
    const path = evt.path || evt.composedPath();
    className = className.replace(".", "");

    return path.filter(x => x.constructor.name.includes("HTML") && (x.className != undefined && x.className.includes(className)))
      .length != 0;
  }

}