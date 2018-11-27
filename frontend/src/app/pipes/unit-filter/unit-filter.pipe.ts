import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '../../modules/main/home/components/unit/Unit';

@Pipe({
  name: 'unitFilter'
})
export class UnitFilterPipe implements PipeTransform {
  transform(units: Unit[], value: string): any {
    return units.filter(x => x.name.toLocaleLowerCase().startsWith(value));
  }
}