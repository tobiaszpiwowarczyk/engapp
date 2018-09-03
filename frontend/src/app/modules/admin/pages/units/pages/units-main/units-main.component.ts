import { UnitService } from './../../../../../../services/unit/unit.service';
import { Component, OnInit } from '@angular/core';
import { Unit } from '../../../../../main/home/components/unit/Unit';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-units-main',
  templateUrl: './units-main.component.html',
  styleUrls: ['./scss/units-main.component.scss']
})
export class UnitsMainComponent implements OnInit {

  units: Unit[] = [];
  loading: boolean = true;

  constructor(
    private unitService: UnitService,
    private title: Title
  ) { }
  ngOnInit() {
    this.unitService.findAll()
      .subscribe((res: Unit[]) => {
        this.units = res;
        this.title.setTitle("Rozdziały - EngApp Panel");
        this.loading = false;
      });
  }

}
