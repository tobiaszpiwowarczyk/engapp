import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableSortableFilterModule } from '../../../../components/table-sortable-filter/table-sortable-filter.module';
import { ProfileModule } from '../../../../directives/profile/profile.module';
import { UnitFilterModule } from '../../../../pipes/unit-filter/unit-filter.module';
import { UnitService } from '../../../../services/unit/unit.service';
import { WordService } from '../../../../services/word/word.service';
import { ButtonModule } from './../../../../components/button/button.module';
import { ChangeImageModalModule } from './../../../../components/change-image-modal/change-image-modal.module';
import { InputGroupModule } from './../../../../components/input-group/input-group.module';
import { InputModule } from './../../../../components/input/input.module';
import { LoaderModule } from './../../../../components/loader/loader.module';
import { MessageModule } from './../../../../components/message/message.module';
import { ModalModule } from './../../../../components/modal/modal.module';
import { SwitchModule } from './../../../../components/switch/switch.module';
import { AddUnitModalComponent } from './components/add-unit-modal/add-unit-modal.component';
import { AddWordModalComponent } from './components/add-word-modal/add-word-modal.component';
import { EditUnitModalComponent } from './components/edit-unit-modal/edit-unit-modal.component';
import { EditWordModalComponent } from './components/edit-word-modal/edit-word-modal.component';
import { UnitsMainComponent } from './pages/units-main/units-main.component';
import { UnitsSingleComponent } from './pages/units-single/units-single.component';
import { UnitWordFilterPipe } from './pipes/unit-word-filter.pipe';
import { UnitWordMarkPipe } from './pipes/unit-word-mark.pipe';
import { ModalService } from './services/modal.service';
import { UnitsRoutingModule } from './units-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UnitsRoutingModule,
    ProfileModule,
    LoaderModule,
    InputModule,
    FormsModule,
    ButtonModule,
    InputGroupModule,
    MessageModule,
    UnitFilterModule,
    SwitchModule,
    ReactiveFormsModule,
    ModalModule,
    ChangeImageModalModule,
    TableSortableFilterModule,
  ],
  declarations: [
    UnitsMainComponent,
    UnitWordFilterPipe,
    UnitWordMarkPipe,
    UnitsSingleComponent,
    AddUnitModalComponent,
    EditUnitModalComponent,
    AddWordModalComponent,
    EditWordModalComponent
  ],
  providers: [UnitService, ModalService, WordService],
})
export class UnitsModule { }
