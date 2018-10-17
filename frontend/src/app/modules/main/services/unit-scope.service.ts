import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class UnitScopeService {

  scope: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor() { }

  public setScope(scope: number): void {
    this.scope.next(scope);
  }

}
