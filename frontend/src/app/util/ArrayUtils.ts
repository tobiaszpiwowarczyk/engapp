

export enum SortDirection {
  ASC, DESC
}


export class ArrayUtils {
  public static sortBy(arr: any[], property: string, direction: SortDirection = SortDirection.ASC): any[] {
    return arr.sort((a, b) => {
      if(typeof a[property] == "number" && typeof b[property] == "number") {
        return direction == SortDirection.ASC
          ? a[property] - b[property]
          : b[property] - a[property];
      }
      else {
        return direction == SortDirection.ASC
          ? ('' + a[property]).localeCompare(b[property])
          : ('' + b[property]).localeCompare(a[property]);
      }
    });
  }

  public static fieldIndexOf(arr: any[], property: string, value: any): number {
    return arr.map(x => x[property]).indexOf(value);
  }
}