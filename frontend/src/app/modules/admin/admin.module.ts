import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from '../../components/header/header.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from './components/sidebar/sidebar.module';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, 
    RouterModule, HeaderModule, SidebarModule],
  exports: [],
  declarations: [AdminComponent],
  providers: [],
})
export class AdminModule { }
