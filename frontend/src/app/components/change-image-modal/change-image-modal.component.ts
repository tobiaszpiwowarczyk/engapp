import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Modal } from '../../modules/admin/pages/units/components/Modal';
import { ModalData, ModalService } from '../../modules/admin/pages/units/services/modal.service';
import { Unit } from '../../modules/main/home/components/unit/Unit';
import { UnitService } from '../../services/unit/unit.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-change-image-modal',
  templateUrl: './change-image-modal.component.html',
  styleUrls: ['./change-image-modal.component.scss']
})
export class ChangeImageModalComponent implements OnInit, Modal {

  @Output() onStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEnd: EventEmitter<Unit> = new EventEmitter<Unit>();
  @ViewChild("modal") modal: ModalComponent;

  mainURL: string;
  unitId: string;

  imageForm: FormGroup;

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private us: UnitService
  ) { }

  ngOnInit() {

    this.modalService.mainURL.subscribe(url => this.mainURL = url);
    this.route.params.subscribe(p => this.unitId = p['id']);

    this.modalService.modalData.subscribe((res: ModalData) => {
      if(res.name == "changeImageModal") {
        this.modal.show();
      }
    });

    this.imageForm = this.fb.group({
      image: null
    });
  }

  public onApprove(): void {
    this.onStart.emit(true);
    this.us.editUnitImage(this.unitId, this.imageForm.value.image)
      .finally(() => this.modalService.resetData())
      .subscribe(res => this.onEnd.emit(res));
  }

  public onClose = (): void => {
    this.imageForm.reset();
    this.modalService.resetData();
  }

}
