import { UsersRoutingModule } from './users-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMainComponent } from './pages/users-main/users-main.component';
import { UsersSingleComponent } from './pages/users-single/users-single.component';
import { ProfileModule } from '../../../../directives/profile/profile.module';
import { UserTypeModule } from './components/user-type/user-type.module';
import { LoaderModule } from '../../../../components/loader/loader.module';
import { InputModule } from '../../../../components/input/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../../../../components/button/button.module';
import { TableSortableFilterModule } from '../../../../components/table-sortable-filter/table-sortable-filter.module';
import { IconModule } from '../../../../components/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule,
    ProfileModule,
    UserTypeModule,
    LoaderModule,
    InputModule,
    ButtonModule,
    IconModule,
    TableSortableFilterModule,
    ReactiveFormsModule
  ],
  declarations: [UsersMainComponent, UsersSingleComponent]
})
export class UsersModule { }
