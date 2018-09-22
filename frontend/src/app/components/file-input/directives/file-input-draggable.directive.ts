import { Directive } from '@angular/core';
import { FileInputComponent } from '../file-input.component';

@Directive({ selector: 'app-file-input[draggable]' })
export class FileInputDraggableDirective {
  constructor(private component: FileInputComponent) {
    this.component.draggable = true;
  }
}