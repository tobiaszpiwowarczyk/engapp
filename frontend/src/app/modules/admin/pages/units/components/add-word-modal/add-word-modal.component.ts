import { PolishValidator } from './../../validator/PolishValidator';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/finally";
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { Modal } from '../Modal';
import { ModalData, ModalService } from './../../services/modal.service';
import { Word } from '../../../../../../services/word/Word';
import { WordService } from '../../../../../../services/word/word.service';


@Component({
  selector: 'app-add-word-modal',
  templateUrl: './add-word-modal.component.html',
  styleUrls: ['./add-word-modal.component.scss']
})
export class AddWordModalComponent implements OnInit, Modal {

  @Output() onStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEnd: EventEmitter<Word> = new EventEmitter<Word>();

  @ViewChild("modal") modal: ModalComponent;

  mainURL: string;
  unitId: string;
  wordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ms: ModalService,
    private ws: WordService
  ) { }

  ngOnInit() {

    this.ms.mainURL.subscribe(url => this.mainURL = url);
    this.route.params.subscribe(p => this.unitId = p["id"]);

    this.ms.modalData.subscribe((res: ModalData) => {
      if(res.name == "addWordModal") {
        this.modal.show();
      }
    });

    this.initForm();
    this.modal.preventApprove = this.wordForm.invalid;

    this.wordForm.valueChanges.subscribe(() => {
      this.modal.preventApprove = this.wordForm.invalid;
    });
  }

  onApprove(): void {
    this.onStart.emit(true);
    this.ws.addWord(this.wordForm.value)
      .finally(() => this.ms.resetData())
      .subscribe(res => this.onEnd.emit(res));
  }
  onClose(): void {
    this.initForm();
    this.ms.resetData();
  }

  public addWord = (): void => (<FormArray>this.wordForm.controls['english']).push(new FormControl("", Validators.required));
  public removeWord = (index: number): void => (<FormArray>this.wordForm.controls['english']).removeAt(index);

  private initForm(): void {
    this.wordForm = this.fb.group({
      unitId: [this.unitId, Validators.required],
      polish: ["", Validators.required, PolishValidator.checkExistence(this.ws, this.unitId)],
      english: this.fb.array([
        new FormControl('', Validators.required)
      ])
    });
  }
}
