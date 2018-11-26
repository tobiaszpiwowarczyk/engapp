import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSortableFilterComponent } from './table-sortable-filter/table-sortable-filter.component';
import { TableSortableService } from './services/table-sortable.service';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { InputModule } from '../input/input.module';
import { TableSortableFilterOptionsCloseableDirective } from './directives/table-sortable-filter-options-closeable.directive';
import { TableSortableOptionsFilterPipe } from './pipes/table-sortable-options-filter.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableSortaleOptionClearSpacePipe } from './pipes/table-sortable-option-clear-space.pipe';
import { TableSortableFilterOutOfScreenDirective } from './directives/table-sortable-filter-content-out-of-screen.directive';
import { FilterPropertyComponent } from './components/filter-property/filter-property.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    IconModule,
    InputModule
  ],
  declarations: [
    TableSortableFilterComponent,
    TableSortableFilterOptionsCloseableDirective,
    TableSortableOptionsFilterPipe,
    TableSortaleOptionClearSpacePipe,
    TableSortableFilterOutOfScreenDirective,
    FilterPropertyComponent
  ],
  exports: [TableSortableFilterComponent, FilterPropertyComponent],
  providers: [TableSortableService]
})
export class TableSortableFilterModule { }
