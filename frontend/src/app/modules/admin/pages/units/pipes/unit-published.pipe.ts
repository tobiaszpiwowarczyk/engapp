import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '../../../../main/home/components/unit/Unit';

@Pipe({
  name: 'unitPublished'
})
export class UnitPublishedPipe implements PipeTransform {

  transform(value: Unit[], published: boolean = true): any {
    return value.filter(x => x.published == published);
  }

}
