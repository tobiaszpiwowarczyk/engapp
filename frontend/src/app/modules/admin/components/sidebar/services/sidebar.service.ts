import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {

  expanded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setExpanded(expanded: boolean): void {
    this.expanded.next(expanded);
  }
}