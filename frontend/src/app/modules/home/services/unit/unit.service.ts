import { Injectable } from '@angular/core';
import { Unit } from '../../components/unit/Unit';

@Injectable()
export class UnitService {

  constructor() { }

  public findAll(): Array<Unit> {
    return [
      new Unit({id: "1", title: "Unit 1", color: "#339966"}),
      new Unit({id: "2", title: "Unit 2", color: "#5E35B1"}),
      new Unit({id: "3", title: "Unit 3", color: "#D81B60"}),
      new Unit({id: "4", title: "Unit 4", color: "#43A047"}),
      new Unit({id: "5", title: "Unit 5", color: "#FB8C00"})
    ];
  }

}
