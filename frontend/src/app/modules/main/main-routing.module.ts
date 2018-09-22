import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: MainComponent, children: [
    { path: '', loadChildren: "./home/home.module#HomeModule" },
    { path: "quiz", loadChildren: "./quiz/quiz.module#QuizModule" },
    { path: "account", loadChildren: "./account/account.module#AccountModule" }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }