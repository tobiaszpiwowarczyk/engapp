import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../../../../../../services/unit/unit.service';
import { ColorValidator } from '../../../../../../validator/ColorValidator';
import { ModalComponent } from './../../../../../../components/modal/modal.component';
import { Unit } from './../../../../../main/home/components/unit/Unit';
import { ModalService, ModalData } from './../../services/modal.service';

import "rxjs/add/operator/finally";

@Component({
  selector: 'app-edit-unit-modal',
  templateUrl: './edit-unit-modal.component.html',
  styleUrls: ['./edit-unit-modal.component.scss']
})
export class EditUnitModalComponent implements OnInit {

  @ViewChild("editUnitModal") editUnitModal: ModalComponent;

  @Output() onStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEnd: EventEmitter<Unit> = new EventEmitter<Unit>();

  mainURL: string;
  unit: Unit;
  editUnitForm: FormGroup;

  constructor(
    private unitService: UnitService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {

    this.modalService.mainURL.subscribe(url => this.mainURL = url);

    this.route.queryParams.subscribe(params => {
      if (params["editUnitModal"] != undefined) {

        if(window.location.href != window.location.origin + this.mainURL) {
          this.router.navigate([this.mainURL]);
        }

        this.editUnitModal.show();
      }
    });

    this.editUnitForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      color: ['', Validators.compose([Validators.required, ColorValidator.validate])],
      published: [false, Validators.required]
    });

    this.editUnitForm.valueChanges.subscribe(() => {
      this.editUnitModal.preventApprove = this.editUnitForm.invalid;
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
          this.editUnitModal.preventApprove = false;
        }

      }
    });
  }

  public resetForm = (): void => {
    this.editUnitForm.reset();
    this.editUnitForm.setValue({
      id: "",
      name: "",
      color: "",
      published: false
    });
    this.router.navigate([this.mainURL]);
    this.modalService.resetData();
  }

  public editUnit(): void {
    this.onStart.emit(true);
    this.unitService.editUnit(this.editUnitForm.value)
      .finally(() => this.modalService.resetData())
      .subscribe((res: Unit) => this.onEnd.emit(res));
  }

}
