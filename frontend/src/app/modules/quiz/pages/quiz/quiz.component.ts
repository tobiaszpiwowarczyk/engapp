import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Unit } from './../../../home/components/unit/Unit';
import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit/unit.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WordService } from '../../services/word/word.service';
import { Word } from '../../services/word/Word';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [UnitService, WordService]
})
export class QuizComponent implements OnInit {

  unit: Unit;
  word: Word;
  quizForm: FormGroup;

  shown: boolean = false;
  valid: boolean = false;

  constructor(
    private unitService: UnitService,
    private route: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private wordService: WordService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.unit = this.unitService.findById(res.id);
      this.title.setTitle("EngApp - Rozdział: " + this.unit.title);
    });
    this.quizForm = this.fb.group({
      word: ['', Validators.required]
    });
    this.word = this.wordService.randomWord();
  }

  public check() {
    this.shown = true;
    this.valid = this.word.english === this.quizForm.controls['word'].value;
  }

}
