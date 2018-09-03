import { UsersSingleComponent } from './pages/users-single/users-single.component';
import { UsersMainComponent } from './pages/users-main/users-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UsersMainComponent },
  { path: ':username', component: UsersSingleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }