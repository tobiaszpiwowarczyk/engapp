import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageHideableDirective } from './directives/message-hideable.directive';
import { MessageContainerComponent } from './message-container/message-container.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from './services/message.service';
import { MessageFloatingDirective } from './directives/message-floating.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    MessageContainerComponent,
    MessageHideableDirective,
    MessageFloatingDirective
  ],
  declarations: [
    MessageComponent,
    MessageContainerComponent,
    MessageHideableDirective,
    MessageFloatingDirective
  ],
  providers: [MessageService]
})
export class MessageModule { }
