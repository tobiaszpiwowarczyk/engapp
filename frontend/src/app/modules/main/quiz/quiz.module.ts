import { ButtonModule } from './../../../components/button/button.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../../../components/header/header.module';
import { InputModule } from '../../../components/input/input.module';
import { LoaderModule } from '../../../components/loader/loader.module';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizMultipleWordExceptPipe } from './pipes/quiz-multiple-word-except.pipe';

@NgModule({
  imports: [
    HeaderModule,
    InputModule,
    LoaderModule,
    ButtonModule,
    CommonModule,
    QuizRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QuizComponent, QuizMultipleWordExceptPipe]
})
export class QuizModule { }
