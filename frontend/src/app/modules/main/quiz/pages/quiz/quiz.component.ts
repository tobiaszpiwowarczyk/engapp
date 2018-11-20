import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { InputComponent } from '../../../../../components/input/input.component';
import { LoaderComponent } from '../../../../../components/loader/loader.component';
import { UnitService } from '../../../../../services/unit/unit.service';
import { UserStatisticsService } from '../../../../../services/user-statistics/user-statistics.service';
import { Word } from '../../../../../services/word/Word';
import { WordService } from '../../../../../services/word/word.service';
import { Unit } from '../../../home/components/unit/Unit';
import { SocketService } from './../../../../../services/socket/socket.service';
import { UnitScopeService } from './../../../services/unit-scope.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [UnitService, WordService, UserStatisticsService]
})
export class QuizComponent implements OnInit {

  @ViewChild("wordInput") wordInput: InputComponent;
  @ViewChild("quizLoader") quizLoader: LoaderComponent;

  wordControl: FormControl = new FormControl("", Validators.required);

  unit: Unit;
  word: Word;
  quizForm: FormGroup;

  badWords: Word[] = [];

  shown: boolean = false;
  valid: boolean = false;
  finished: boolean = false;
  multipleAnswers: boolean = false;

  errors: any;
  nums: number[] = [];

  points: number = 0;
  scope: number = 0;
  currentWord: number = 1;
  currentBadWord: number = 0;

  constructor(
    private unitService: UnitService,
    private route: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private wordService: WordService,
    private unitss: UnitScopeService,
    private socket: SocketService
  ) { }

  ngOnInit() {
    this.quizLoader.show();
    this.unitss.scope.subscribe(res => this.scope = res);
    this.route.params.subscribe(r => {
      this.unitService.findById(r.id)
        .subscribe(res => {
          this.unit = res;
          this.title.setTitle("EngApp - Rozdział: " + this.unit.name);
          this.renderWord();
        }, err => this.errors = err);
    });

    this.quizForm = this.fb.group({
      word: this.wordControl
    });
  }






  public check(): void {
    this.shown = true;
    this.wordInput.blur();
    this.wordControl.disable();
    this.multipleAnswers = this.word.english.length > 1;

    if(this.multipleAnswers) {
      this.valid = this.word.english.includes(this.quizForm.controls.word.value);
    }
    else {
      this.valid = this.word.english[0] === this.quizForm.controls.word.value;
    }

    if(this.valid) {
      if(this.firstStageNonFinnished()) {
        this.points++;
      } else {
        this.badWords.splice(this.badWords.indexOf(this.word), 1);
      }
    } else {
      if(this.firstStageNonFinnished()) this.badWords.push(this.word);
      else this.currentBadWord++;
    }

    if(this.currentBadWord == this.badWords.length) {
      this.currentBadWord = 0;
    }
  }







  public next(): void {
    this.shown = false;
    this.valid = false;
    this.currentWord++;
    this.quizForm.reset();
    this.wordControl.enable();

    if(this.firstStageNonFinnished()) {
      this.renderWord();
    }
    else {

      if(this.badWords.length == 0) {
        this.finished = true;

        this.socket.sendData("/app/add-user-statistics", {
          score: this.points,
          total: this.scope,
          unitId: this.unit.id
        });
      }
      else {
        this.word = this.badWords[this.currentBadWord];
        this.wordInput.focus();
      }
    }
  }




  public restart(): void {
    this.word = null;
    this.finished = false;
    this.points = 0;
    this.currentWord = 1;
    this.currentBadWord = 1;
    this.nums = [];
    this.shown = false;
    this.valid = false;

    this.renderWord();
  }




  private randomNumber(): number {
    let r = 1 + Math.floor(Math.random() * (this.unit.wordsCount - 1));
    while(this.nums.includes(r)) {
      r = 1 + Math.floor(Math.random() * (this.unit.wordsCount - 1));
    }
    this.nums.push(r);
    return r;
  }

  private renderWord(): void {
    this.quizLoader.show();
    this.wordService.randomWord(this.unit.id, this.randomNumber())
      .subscribe(r => {
        this.word = r;
        this.wordInput.focus();
        this.quizLoader.hide();
      });
  }

  private firstStageNonFinnished(): boolean {
    return this.currentWord <= this.scope;
  }

}
