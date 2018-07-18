import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "login", loadChildren: "./login/login.module#LoginModule" },
  { path: "register", loadChildren: "./register/register.module#RegisterModule" },
  { path: "home", loadChildren: "./home/home.module#HomeModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
