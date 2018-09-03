import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../../../../directives/profile/profile.module';
import { UnitService } from '../../../../services/unit/unit.service';
import { InputModule } from './../../../../components/input/input.module';
import { LoaderModule } from './../../../../components/loader/loader.module';
import { UnitsMainComponent } from './pages/units-main/units-main.component';
import { UnitsSingleComponent } from './pages/units-single/units-single.component';
import { UnitPublishedPipe } from './pipes/unit-published.pipe';
import { UnitsRoutingModule } from './units-routing.module';
import { UnitFilterPipe } from './pipes/unit-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UnitsRoutingModule,
    ProfileModule,
    LoaderModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UnitsMainComponent,
    UnitPublishedPipe,
    UnitFilterPipe,
    UnitsSingleComponent
  ],
  providers: [UnitService],
})
export class UnitsModule { }
