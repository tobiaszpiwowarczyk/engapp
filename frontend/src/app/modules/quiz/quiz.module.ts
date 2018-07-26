import { InputModule } from '../../components/input/input.module';
import { HeaderModule } from '../../components/header/header.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../../components/loader/loader.module';

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
