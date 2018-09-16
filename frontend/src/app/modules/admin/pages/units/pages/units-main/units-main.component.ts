import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import "rxjs/add/operator/finally";
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { LoaderComponent } from './../../../../../../components/loader/loader.component';
import { MessageComponent } from './../../../../../../components/message/message.component';
import { UnitService } from './../../../../../../services/unit/unit.service';
import { Unit } from './../../../../../main/home/components/unit/Unit';
import { ModalService } from './../../services/modal.service';
import { listAnimation } from '../../../../../../animations/animations';


@Component({
  selector: 'app-units-main',
  templateUrl: './units-main.component.html',
  styleUrls: ['./scss/units-main.component.scss'],
  animations: [listAnimation]
})
export class UnitsMainComponent implements OnInit {

  units: Unit[] = [];
  loading: boolean = true;

  edittedUnit: Unit;

  addModalShown: boolean = false;

  @ViewChild("loader") loader: LoaderComponent;
  @ViewChild("boxLoader") boxLoader: LoaderComponent;
  @ViewChild("infoModal") infoModal: ModalComponent;
  @ViewChild("message") message: MessageComponent;

  constructor(
    private unitService: UnitService,
    private modalService: ModalService,
    private title: Title,
    private router: Router
  ) { }
  ngOnInit() {
    this.unitService.findAll()
      .finally(() => this.loading = false)
      .subscribe((res: Unit[]) => {
        this.units = res;
        this.title.setTitle("Rozdziały - EngApp Panel");
      });

    this.modalService.setMainUrl("/admin/units");
  }

  public addModalEnd(unit: Unit): void {
    this.units.push(unit);
    this.boxLoader.hide();
    this.message.showWithText("Rozdział został dodany pomyślnie");
  }

  public openEditModal(unit: Unit): void {
    this.modalService.setData({
      name: "editUnitModal",
      data: unit
    });
    this.router.navigate(["/admin/units"], {queryParams: {editUnitModal: true}});
  }

  public editUnit(unit: Unit): void {
    this.units[this.units.map(u => u.id).indexOf(unit.id)] = unit;
    this.boxLoader.hide();
    this.message.showWithText("Rozdział został zaktualizowany pomyślnie");
  }


  public openInfoModal(unit: Unit): void {
    this.infoModal.show();
    this.edittedUnit = unit;
  }

  public deleteUnit(): void {
    this.boxLoader.show();
    this.unitService.deleteUnit(this.edittedUnit.id)
      .finally(() => this.boxLoader.hide())
      .subscribe(res => {
        this.units.splice(this.units.indexOf(this.edittedUnit), 1);
        this.message.content = res.state;
        this.message.show();
        this.resetEdittedUnit();
      });
  }

  public resetEdittedUnit(): void {
    this.edittedUnit = null;
  }
}
