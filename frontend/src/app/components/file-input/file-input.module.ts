import { FileInputService } from './services/file-input.service';
import { IconModule } from './../icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './file-input.component';
import { ButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';
import { FileInputDraggableDirective } from './directives/file-input-draggable.directive';
import { FileInputDropZoneDirective } from './directives/file-input-drop-zone.directive';
import { InputGroupModule } from '../input-group/input-group.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    IconModule,
    InputGroupModule
  ],
  declarations: [
    FileInputComponent,
    FileInputDraggableDirective,
    FileInputDropZoneDirective
  ],
  exports: [
    FileInputComponent,
    FileInputDraggableDirective
  ],
  providers: [FileInputService]
})
export class FileInputModule { }
