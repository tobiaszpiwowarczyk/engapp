import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/finally";
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { Modal } from '../Modal';
import { Word } from './../../../../../main/quiz/services/word/Word';
import { WordService } from './../../../../../main/quiz/services/word/word.service';
import { ModalData, ModalService } from './../../services/modal.service';


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
  ) {}

  ngOnInit() {

    this.ms.mainURL.subscribe(url => this.mainURL = url);
    this.route.params.subscribe(p => this.unitId = p["id"]);

    this.ms.modalData.subscribe((res: ModalData) => {
      if(res.name == "addWordModal") {
        this.modal.show();
      }
    });

    this.wordForm = this.fb.group({
      polish: ["", Validators.required],
      english: this.fb.array([
        new FormControl('', Validators.required)
      ])
    });
    this.modal.preventApprove = true;

    this.wordForm.valueChanges.subscribe(() => {
      this.modal.preventApprove = this.wordForm.invalid;
    });
  }

  onApprove(): void {
    this.onStart.emit(true);
    this.ws.addWord(this.unitId, this.wordForm.value)
      .finally(() => this.ms.resetData())
      .subscribe(res => this.onEnd.emit(res));
  }
  onClose(): void {
    this.wordForm = this.fb.group({
      polish: ["", Validators.required],
      english: this.fb.array([
        new FormControl('', Validators.required)
      ])
    });
    this.ms.resetData();
  }

  public addWord = (): void => (<FormArray> this.wordForm.controls['english']).push(new FormControl("", Validators.required));
  public removeWord = (index: number): void => (<FormArray> this.wordForm.controls['english']).removeAt(index);

}
