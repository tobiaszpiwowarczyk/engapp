import { WordService } from './../../../../../main/quiz/services/word/word.service';
import { ModalService } from './../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Word } from './../../../../../main/quiz/services/word/Word';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ModalComponent } from '../../../../../../components/modal/modal.component';

@Component({
  selector: 'app-add-word-modal',
  templateUrl: './add-word-modal.component.html',
  styleUrls: ['./add-word-modal.component.scss']
})
export class AddWordModalComponent implements OnInit {

  @Output() onStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEnd: EventEmitter<Word> = new EventEmitter<Word>();

  @ViewChild("modal") modal: ModalComponent;

  mainURL: string;
  unitId: string;
  wordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ms: ModalService,
    private ws: WordService
  ) {}

  ngOnInit() {

    this.ms.mainURL.subscribe(url => this.mainURL = url);
    this.route.params.subscribe(p => this.unitId = p["id"]);

    this.route.queryParams.subscribe(params => {
      if(params["addWordModal"] != undefined) {
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

  public modalClose(): void {
    this.wordForm = this.fb.group({
      polish: ["", Validators.required],
      english: this.fb.array([
        new FormControl('', Validators.required)
      ])
    })
    this.router.navigate([this.mainURL]);
  }

  public sendWord(): void {
    this.onStart.emit(true);
    this.ws.addWord(this.unitId, this.wordForm.value)
      .subscribe(res => this.onEnd.emit(res));
  }

  public addWord = (): void => (<FormArray> this.wordForm.controls['english']).push(new FormControl("", Validators.required));
  public removeWord = (index: number): void => (<FormArray> this.wordForm.controls['english']).removeAt(index);

}
