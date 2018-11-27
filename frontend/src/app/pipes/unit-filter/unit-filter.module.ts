import { NgModule } from '@angular/core';
import { UnitPublishedPipe } from './unit-published.pipe';
import { UnitFilterPipe } from './unit-filter.pipe';

@NgModule({
  exports: [UnitPublishedPipe, UnitFilterPipe],
  declarations: [UnitPublishedPipe, UnitFilterPipe],
  providers: [],
})
export class UnitFilterModule { }
