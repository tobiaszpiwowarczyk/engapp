import { HeaderComponent } from '../../../../components/header/header.component';
import { InputComponent } from '../../../../components/input/input.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Unit } from '../../../home/components/unit/Unit';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from '../../../../services/unit/unit.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WordService } from '../../services/word/word.service';
import { Word } from '../../services/word/Word';
import { LoaderComponent } from '../../../../components/loader/loader.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [UnitService, WordService]
})
export class QuizComponent implements OnInit {

  @ViewChild("wordInput") wordInput: InputComponent;
  @ViewChild("quizLoader") quizLoader: LoaderComponent;
  @ViewChild("header") header: HeaderComponent;

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
    private wordService: WordService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(r => {
      this.scope = parseInt(localStorage.getItem("scope"), 10);
      this.unitService.findById(r.id)
        .then(res => {
          this.unit = res;
          this.title.setTitle("EngApp - Rozdział: " + this.unit.name);
          this.header.showSubtitle();
          this.renderWord();
        }, err => this.errors = err);
    });

    this.quizForm = this.fb.group({
      word: ['', Validators.required]
    });

    window.addEventListener("keydown", (e) => {
      const code = e.keyCode || e.which;
      if(code == 13) {
        if(this.shown) this.next();
      }
    }, false);
  }


  public check(): void {
    this.shown = true;
    this.quizForm.controls.word.disable();
    this.wordInput.blur();

    if(typeof(this.word.english) == "string") {
      this.valid = this.word.english === this.quizForm.controls.word.value;
      this.multipleAnswers = false;
    }
    else {
      this.valid = this.word.english.includes(this.quizForm.controls.word.value);
      this.multipleAnswers = true;
    }

    if(this.valid) {
      if(this.firstStageNonFinnished()) {
        this.points++;

        if(this.multipleAnswers) {
          this.word.english.splice(this.word.english.indexOf(this.quizForm.controls.word.value), 1);
        }

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
    this.quizForm.controls.word.enable();

    if(this.firstStageNonFinnished()) {
      this.renderWord();
    }
    else {

      if(this.badWords.length == 0) {
        this.finished = true;
      }
      else {
        this.word = this.badWords[this.currentBadWord];
        setTimeout(() => this.wordInput.focus(), 10);
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
