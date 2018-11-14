import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class UnitScopeService {

  scope: BehaviorSubject<number> = new BehaviorSubject<number>(parseInt(localStorage.getItem("scope"), 10) || 20);

  constructor() { }

  public setScope(scope: number): void {
    localStorage.setItem("scope", scope.toString());
    this.scope.next(scope);
  }

}
