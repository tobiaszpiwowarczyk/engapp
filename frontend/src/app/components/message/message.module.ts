import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [MessageComponent],
  declarations: [MessageComponent],
})
export class MessageModule { }
