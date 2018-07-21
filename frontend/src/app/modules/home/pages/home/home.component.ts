import { Unit } from './../../components/unit/Unit';
import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit/unit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UnitService]
})
export class HomeComponent implements OnInit {

  units: Array<Unit> = [];

  constructor(
    private unitService: UnitService
  ) { }


  ngOnInit() {
    this.units = this.unitService.findAll();
  }

}
