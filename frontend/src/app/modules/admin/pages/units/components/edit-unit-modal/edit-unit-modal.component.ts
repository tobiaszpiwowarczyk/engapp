import { UnitValidator } from './../../../../../../validator/UnitValidator';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import "rxjs/add/operator/finally";
import { UnitService } from '../../../../../../services/unit/unit.service';
import { ColorValidator } from '../../../../../../validator/ColorValidator';
import { Modal } from '../Modal';
import { ModalComponent } from './../../../../../../components/modal/modal.component';
import { Unit } from './../../../../../main/home/components/unit/Unit';
import { ModalData, ModalService } from './../../services/modal.service';


@Component({
  selector: 'app-edit-unit-modal',
  templateUrl: './edit-unit-modal.component.html',
  styleUrls: ['./edit-unit-modal.component.scss']
})
export class EditUnitModalComponent implements OnInit, Modal {

  @ViewChild("modal") modal: ModalComponent;

  @Output() onStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEnd: EventEmitter<Unit> = new EventEmitter<Unit>();

  mainURL: string;
  unit: Unit;
  editUnitForm: FormGroup;

  constructor(
    private unitService: UnitService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) { }
  ngOnInit() {

    this.modalService.mainURL.subscribe(url => this.mainURL = url);

    this.editUnitForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, UnitValidator.validateName])],
      color: ['', Validators.compose([Validators.required, ColorValidator.validate])],
      published: [false, Validators.required]
    });

    this.editUnitForm.valueChanges.subscribe(() => {
      this.modal.preventApprove = this.editUnitForm.invalid;
    });

    this.modalService.modalData.subscribe((modalData: ModalData) => {

      if(modalData != undefined && modalData.name == "editUnitModal") {
        this.unit = modalData.data;

        if(modalData.data != undefined || JSON.stringify(modalData.data) != "{}") {
          this.editUnitForm.setValue({
            id: this.unit.id,
            name: this.unit.name,
            color: this.unit.color,
            published: this.unit.published
          });
          this.editUnitForm.controls["name"].setAsyncValidators(
            UnitValidator.validateEdition(this.unitService, this.unit.id)
          );
          this.modal.preventApprove = false;
        }

        this.modal.show();
      }
    });
  }

  public onApprove(): void {
    this.onStart.emit(true);
    this.unitService.editUnit(this.editUnitForm.value)
      .finally(() => this.modalService.resetData())
      .subscribe((res: Unit) => this.onEnd.emit(res));
  }

  public onClose(): void {
    this.editUnitForm.reset();
    this.editUnitForm.setValue({
      id: "",
      name: "",
      color: "",
      published: false
    });
    this.modalService.resetData();
  }

}
