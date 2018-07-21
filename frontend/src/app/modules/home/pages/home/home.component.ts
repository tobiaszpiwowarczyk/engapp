import { Unit } from './../../components/unit/Unit';
import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit/unit.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UnitService]
})
export class HomeComponent implements OnInit {

  units: Array<Unit> = [];

  constructor(
    private unitService: UnitService,
    private title: Title
  ) { }


  ngOnInit() {
    this.title.setTitle("EngApp - Strona główna");
    this.units = this.unitService.findAll();
  }

}
