import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import "rxjs/add/operator/map";
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { UnitService } from '../../../../services/unit/unit.service';
import { Unit } from '../../components/unit/Unit';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UnitService]
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
