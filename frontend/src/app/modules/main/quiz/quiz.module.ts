import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../../../components/header/header.module';
import { InputModule } from '../../../components/input/input.module';
import { LoaderModule } from '../../../components/loader/loader.module';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';

@NgModule({
  imports: [
    HeaderModule,
    InputModule,
    LoaderModule,
    CommonModule,
    QuizRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QuizComponent]
})
export class QuizModule { }
