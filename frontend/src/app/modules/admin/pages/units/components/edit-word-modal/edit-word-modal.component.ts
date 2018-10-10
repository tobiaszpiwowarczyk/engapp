import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/finally";
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { Word } from '../../../../../../services/word/Word';
import { WordService } from '../../../../../../services/word/word.service';
import { ModalData } from '../../services/modal.service';
import { ModalService } from './../../services/modal.service';
import { PolishValidator } from './../../validator/PolishValidator';
import { Modal } from './../Modal';


@Component({
  selector: 'app-edit-word-modal',
  templateUrl: './edit-word-modal.component.html',
  styleUrls: ['./edit-word-modal.component.scss'],
})
export class EditWordModalComponent implements OnInit, Modal {

  @Output() onStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEnd: EventEmitter<Word> = new EventEmitter<Word>();

  @ViewChild("modal") modal: ModalComponent;


  word: Word;
  unitId: string;
  mainURL: string;
  wordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private wordService: WordService
  ) { }

  ngOnInit() {

    this.modalService.mainURL.subscribe(url => this.mainURL = url);
    this.route.params.subscribe(p => this.unitId = p['id']);
    this.initForm();

    this.modalService.modalData.subscribe((modalData: ModalData) => {

      if(modalData != undefined && modalData.name == "editWordModal") {
        this.word = modalData.data;

        if(modalData.data != undefined || JSON.stringify(modalData.data) == "{}") {

          modalData.data.english.forEach(() => this.addWord());
          this.wordForm.setValue({
            unitId: modalData.data.unitId,
            wordNumber: modalData.data.wordNumber,
            polish: modalData.data.polish,
            english: modalData.data.english
          });

          this.wordForm.controls['polish'].setAsyncValidators(
            PolishValidator.validatePolishEditing(this.wordService, this.unitId, this.word.wordNumber)
          );

          this.modal.preventApprove = false;

          this.wordForm.valueChanges.subscribe(() => {
            this.modal.preventApprove = this.wordForm.invalid;
          });
        }

        this.modal.show();
      }
    });
  }

  onApprove(): void {
    this.onStart.emit(true);
    this.wordService.editWord(this.unitId, this.wordForm.value)
      .finally(() => this.modalService.resetData())
      .subscribe(res => this.onEnd.emit(res));
  }
  onClose(): void {
    this.initForm();
    this.modalService.resetData();
  }

  public addWord = (): void => (<FormArray>this.wordForm.controls['english']).push(new FormControl("", Validators.required));
  public removeWord = (index: number): void => (<FormArray>this.wordForm.controls['english']).removeAt(index);

  private initForm(): void {
    this.wordForm = this.fb.group({
      unitId: [this.unitId, Validators.required],
      wordNumber: [0, Validators.required],
      polish: ['', Validators.required],
      english: this.fb.array([])
    });
  }
}
