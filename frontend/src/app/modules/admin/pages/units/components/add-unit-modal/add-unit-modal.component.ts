import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { ColorValidator } from '../../../../../../validator/ColorValidator';
import { Modal } from '../Modal';
import { UnitService } from './../../../../../../services/unit/unit.service';
import { Unit } from './../../../../../main/home/components/unit/Unit';
import { ModalData, ModalService } from './../../services/modal.service';

@Component({
  selector: 'app-add-unit-modal',
  templateUrl: './add-unit-modal.component.html',
  styleUrls: ['./add-unit-modal.component.scss']
})
export class AddUnitModalComponent implements OnInit, Modal {


  @ViewChild("modal") modal: ModalComponent;

  @Output() onStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEnd: EventEmitter<Unit> = new EventEmitter<Unit>();

  newUnitForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService,
    private modalService: ModalService
  ) { }

  ngOnInit() {

    this.modalService.modalData.subscribe((res: ModalData) => {
      if(res.name == "addUnitModal") {
        this.modal.show();
      }
    });

    this.newUnitForm = this.fb.group({
      name: ['Nowy rozdział', Validators.required],
      color: ['#000', Validators.compose([Validators.required, ColorValidator.validate])]
    });
  }

  public onApprove(): void {
    this.onStart.emit(true);
    this.unitService.addUnit(this.newUnitForm.value)
      .subscribe(unit => this.onEnd.emit(unit));
  }
  public onClose(): void {
    this.newUnitForm.setValue({ name: "Nowy rozdział", color: "#000" });
    this.modalService.resetData();
  }
}