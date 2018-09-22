import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HeaderService {

  menuOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  public setMenuOpen(opened: boolean): void {
    this.menuOpen.next(opened);
  }
}