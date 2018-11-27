import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import "rxjs/add/operator/finally";
import { listAnimation, listItemAnimation } from '../../../../../../animations/animations';
import { MessageContainerComponent } from '../../../../../../components/message/message-container/message-container.component';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { LoaderComponent } from './../../../../../../components/loader/loader.component';
import { UnitService } from './../../../../../../services/unit/unit.service';
import { Unit } from './../../../../../main/home/components/unit/Unit';
import { ModalService } from './../../services/modal.service';


@Component({
  selector: 'app-units-main',
  templateUrl: './units-main.component.html',
  styleUrls: ['./scss/units-main.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class UnitsMainComponent implements OnInit {

  units: Unit[] = [];
  loading: boolean = true;

  edittedUnit: Unit;

  addModalShown: boolean = false;

  unitSearchInputValue: string = "";

  @ViewChild("boxLoader") boxLoader: LoaderComponent;
  @ViewChild("approveModal") approveModal: ModalComponent;
  @ViewChild("message") message: MessageContainerComponent;

  constructor(
    private unitService: UnitService,
    private modalService: ModalService,
    private title: Title
  ) { }
  ngOnInit() {
    this.unitService.findAll()
      .subscribe((res: Unit[]) => {
        this.units = res;
        this.title.setTitle("Rozdziały - EngApp Panel");
      }, null, () => this.loading = false);

    this.modalService.setMainUrl("/admin/units");
  }

  public openAddUnitModal = (): void => this.modalService.setData({ name: "addUnitModal" });

  public addUnit(unit: Unit): void {
    this.units.push(unit);
    this.boxLoader.hide();
    this.message.show("Rozdział został dodany pomyślnie");
  }

  public openEditModal(unit: Unit): void {
    this.modalService.setData({
      name: "editUnitModal",
      data: unit
    });
  }

  public editUnit(unit: Unit): void {
    this.units[this.units.map(u => u.id).indexOf(unit.id)] = unit;
    this.boxLoader.hide();
    this.message.show("Rozdział został zaktualizowany pomyślnie");
  }


  public openInfoModal(unit: Unit): void {
    this.approveModal.show();
    this.edittedUnit = unit;
  }

  public deleteUnit(): void {
    this.boxLoader.show();
    this.unitService.deleteUnit(this.edittedUnit.id)
      .subscribe(res => {
        this.units.splice(this.units.indexOf(this.edittedUnit), 1);
        this.message.show(res.state);
        this.resetEdittedUnit();
      }, null, () => this.boxLoader.hide());
  }

  public resetEdittedUnit(): void {
    this.edittedUnit = null;
  }
}
