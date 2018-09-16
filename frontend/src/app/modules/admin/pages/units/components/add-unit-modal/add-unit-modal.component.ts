import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorValidator } from '../../../../../../validator/ColorValidator';
import { UnitService } from './../../../../../../services/unit/unit.service';
import { Unit } from './../../../../../main/home/components/unit/Unit';
import { ModalComponent } from '../../../../../../components/modal/modal.component';

@Component({
  selector: 'app-add-unit-modal',
  templateUrl: './add-unit-modal.component.html',
  styleUrls: ['./add-unit-modal.component.scss']
})
export class AddUnitModalComponent implements OnInit {


  @ViewChild("modal") modal: ModalComponent;

  @Output() onStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEnd: EventEmitter<Unit> = new EventEmitter<Unit>();

  newUnitForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params["addModalOpen"] != undefined) {
        this.modal.show();
      }
    });

    this.newUnitForm = this.fb.group({
      name: ['Nowy rozdział', Validators.required],
      color: ['#000', Validators.compose([Validators.required, ColorValidator.validate])]
    });
  }

  public resetForm(): void {
    this.newUnitForm.setValue({ name: "Nowy rozdział", color: "#000" });
    this.router.navigate(["/admin/units"]);
  }


  public addUnit(): void {
    this.onStart.emit(true);
    this.unitService.addUnit(this.newUnitForm.value)
      .subscribe(unit => this.onEnd.emit(unit));
  }
}