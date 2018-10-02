import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import "rxjs/add/operator/map";
import { listAnimation } from '../../../../../animations/animations';
import { LoaderComponent } from '../../../../../components/loader/loader.component';
import { UnitService } from '../../../../../services/unit/unit.service';
import { Unit } from '../../components/unit/Unit';
import { LoginService } from './../../../../../services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UnitService],
  animations: [listAnimation]
})
export class HomeComponent implements OnInit {

  @ViewChild("homeLoader") homeLoader: LoaderComponent;

  isUser: boolean = false;
  units: Array<Unit> = [];
  loading: boolean = true;

  constructor(
    private loginService: LoginService,
    private unitService: UnitService,
    private title: Title
  ) { }


  ngOnInit() {
    this.title.setTitle("EngApp - Strona główna");

    this.loginService.getUserData()
      .subscribe(user => this.isUser = user.role == "USER");

    this.unitService.findAll()
      .subscribe(res => this.units = res, null, () => this.loading = false);
  }

}
