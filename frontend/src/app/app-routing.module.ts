import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "login", loadChildren: "./modules/login/login.module#LoginModule"},
  { path: "register", loadChildren: "./modules/register/register.module#RegisterModule" },
  { path: "quiz", loadChildren: "./modules/quiz/quiz.module#QuizModule" },
  { path: "account", loadChildren: "./modules/account/account.module#AccountModule" },
  { path: "", loadChildren: "./modules/home/home.module#HomeModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
