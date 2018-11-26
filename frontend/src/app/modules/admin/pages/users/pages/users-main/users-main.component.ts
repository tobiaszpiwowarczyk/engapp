import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import "rxjs/add/operator/map";
import { FilterProperty, TableSortableService } from '../../../../../../components/table-sortable-filter/services/table-sortable.service';
import { User } from '../../../../../../services/user/User';
import { UserService } from './../../../../../../services/user/user.service';


@Component({
  selector: 'app-users-main',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.scss']
})
export class UsersMainComponent implements OnInit {

  users: User[];
  filterProps: FilterProperty[] = [];

  loading: boolean = true;

  constructor(
    private us: UserService,
    private title: Title,
    private tss: TableSortableService
  ) { }
  ngOnInit() {
    this.us.findAll()
      .subscribe((res: User[]) => {

        this.tss.initData(res);
        this.tss.data.subscribe(data => {
          this.users = data;
        });

        this.tss.retrieveFilterProperties()
          .subscribe(criteria => this.filterProps = criteria);

        this.title.setTitle("Użytkownicy - EngApp Panel");
      }, null, () => this.loading = false);
  }


  public toggleFilter = (): void => this.tss.toggleFilter();
}