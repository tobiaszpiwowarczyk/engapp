import { QuizComponent } from './pages/quiz/quiz.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';

@NgModule({
  imports: [
    CommonModule,
    QuizRoutingModule
  ],
  declarations: [QuizComponent]
})
export class QuizModule { }
