import { Component, Input, OnInit } from '@angular/core';
import { Unit } from './Unit';
import { listItemAnimation } from '../../../../../animations/animations';
import { UnitScopeService } from '../../../services/unit-scope.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./scss/unit.component.scss'],
  animations: [listItemAnimation]
})
export class UnitComponent implements OnInit {

  @Input() unit: Unit;

  options: number[] = [15, 20, 25, 30];
  selected: number = 20;
  optionsShown: boolean = false;

  constructor(private uss: UnitScopeService) { }
  ngOnInit() {
    this.uss.setScope(this.selected);
  }

  public toggleOptions(): void {
    this.optionsShown = !this.optionsShown;
  }

  public selectOption(option: number): void {
    this.selected = option;
    this.uss.setScope(option);
  }
}
