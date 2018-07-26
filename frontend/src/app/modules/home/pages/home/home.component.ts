import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import "rxjs/add/operator/map";
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { LoginService } from '../../../../services/login/login.service';
import { UnitService } from '../../../../services/unit/unit.service';
import { UserService } from '../../../../services/user/user.service';
import { Unit } from '../../components/unit/Unit';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UnitService, UserService, LoginService]
})
export class HomeComponent implements OnInit {

  @ViewChild("homeLoader") homeLoader: LoaderComponent;

  units: Array<Unit> = [];

  constructor(
    private unitService: UnitService,
    private title: Title
  ) { }


  ngOnInit() {
    this.title.setTitle("EngApp - Strona główna");
    this.homeLoader.show();

    this.unitService.findAll()
      .subscribe(res => {
        this.units = res;
        this.homeLoader.hide();
      });
  }

}
