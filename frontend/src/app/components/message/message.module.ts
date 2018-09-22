import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { CommonModule } from '@angular/common';
import { MessageFloatingDirective } from './directives/message-floating.directive';
import { MessageTypeDirective } from './directives/message-type.directive';
import { MessageAutoHideDirective } from './directives/message-auto-hide.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    MessageComponent,
    MessageFloatingDirective,
    MessageTypeDirective,
    MessageAutoHideDirective],
  declarations: [
    MessageComponent,
    MessageFloatingDirective,
    MessageTypeDirective,
    MessageAutoHideDirective
  ],
})
export class MessageModule { }
