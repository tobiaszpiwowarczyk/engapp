import { SocketService } from './../../services/socket/socket.service';
import { SidebarService } from './components/sidebar/services/sidebar.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from '../../components/header/header.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { StompService } from 'ng2-stomp-service';
import { ErrorReportService } from '../../services/error-report/error-report.service';

@NgModule({
  imports: [CommonModule, AdminRoutingModule,
    RouterModule, HeaderModule, SidebarModule],
  exports: [],
  declarations: [AdminComponent],
  providers: [
    SidebarService,
    StompService,
    SocketService,
    ErrorReportService
  ]
})
export class AdminModule { }
