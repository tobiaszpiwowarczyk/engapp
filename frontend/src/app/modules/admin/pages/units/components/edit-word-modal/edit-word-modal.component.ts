import { WordService } from './../../../../../main/quiz/services/word/word.service';
import { ModalService } from './../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Word } from '../../../../../main/quiz/services/word/Word';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { FormUtils } from '../../../../../../util/FormUtils';
import { ModalData } from '../../services/modal.service';

import "rxjs/add/operator/finally";

@Component({
  selector: 'app-edit-word-modal',
  templateUrl: './edit-word-modal.component.html',
  styleUrls: ['./edit-word-modal.component.scss'],
})
export class EditWordModalComponent implements OnInit {

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
    private router: Router,
    private modalService: ModalService,
    private wordService: WordService
  ) { }

  ngOnInit() {

    this.modalService.mainURL.subscribe(url => this.mainURL = url);
    this.route.params.subscribe(p => this.unitId = p['id']);

    this.route.queryParams.subscribe(params => {
      if(params["editWordModal"] != undefined) {

        if(window.location.href != window.location.origin + this.mainURL) {
          this.router.navigate([this.mainURL]);
        }

        this.modal.show();
      }
    });

    this.wordForm = this.fb.group({
      wordNumber: new FormControl(0, Validators.required),
      polish: ['', Validators.required],
      english: this.fb.array([
        new FormControl("", Validators.required)
      ])
    });

    this.wordForm.valueChanges.subscribe(() => {
      this.modal.preventApprove = this.wordForm.invalid;
    });

    this.modalService.modalData.subscribe((modalData: ModalData) => {

      if(modalData != undefined && modalData.name == "editWordModal") {
        this.word = modalData.data;

        if(modalData.data != undefined || JSON.stringify(modalData.data) == "{}") {

          this.wordForm = FormUtils.wordToFormGroup(this.word);
          this.modal.preventApprove = false;
        }
      }
    });
  }

  public addWord = (): void => (<FormArray> this.wordForm.controls['english']).push(new FormControl("", Validators.required));
  public removeWord = (index: number): void => (<FormArray> this.wordForm.controls['english']).removeAt(index);
  public clearData(): void {
    this.wordForm.reset();
    this.wordForm.setValue({wordNumber: 0, polish: "", english: [""]});
    this.modalService.resetData();
  }

  public editWord(): void {
    this.onStart.emit(true);
    this.wordService.editWord(this.unitId, this.wordForm.value)
      .finally(() => this.modalService.resetData())
      .subscribe(res => this.onEnd.emit(res));
  }
}
