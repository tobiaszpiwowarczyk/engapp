import { Injectable } from '@angular/core';
import { Unit } from '../../modules/home/components/unit/Unit';

// todo: add http requests
@Injectable()
export class UnitService {

  private units: Array<Unit> = [
    new Unit({id: "1", title: "Unit 1", color: "#339966"}),
    new Unit({id: "2", title: "Unit 2", color: "#5E35B1"}),
    new Unit({id: "3", title: "Unit 3", color: "#D81B60"}),
    new Unit({id: "4", title: "Unit 4", color: "#43A047"}),
    new Unit({id: "5", title: "Unit 5", color: "#FB8C00"})
  ];

  constructor() { }

  public findAll(): Array<Unit> {
    return this.units;
  }

  public findById(id: string): Unit {
    return this.units.filter((u: Unit) => u.id === id)[0];
  }

}
