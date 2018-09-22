import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  { path: ':username', component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }

export const routedComponents = [AccountComponent];