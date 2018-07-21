import { Component, OnInit, Input } from '@angular/core';
import { Unit } from './Unit';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

  @Input() unit: Unit;

  constructor() {}
  ngOnInit() {}

}
