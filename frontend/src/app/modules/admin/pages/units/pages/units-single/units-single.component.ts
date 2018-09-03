import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Unit } from '../../../../../main/home/components/unit/Unit';
import { Word } from '../../../../../main/quiz/services/word/Word';
import { UnitService } from './../../../../../../services/unit/unit.service';

@Component({
  selector: 'app-units-single',
  templateUrl: './units-single.component.html',
  styleUrls: ['./units-single.component.scss', "../../../../scss/profile.scss"]
})
export class UnitsSingleComponent implements OnInit {

  unit: Unit;
  words: Word[] = [];
  loading: boolean = true;

  wordsSearchFormGroup: FormGroup;
  word: FormControl = new FormControl("");

  constructor(
    private us: UnitService,
    private route: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.route.params.subscribe(param => {
      this.us.findById(param.id)
        .then((unit: Unit) => {
          this.unit = unit;
          this.words = unit.words;
          this.title.setTitle(`Rozdział: ${unit.name} - EngApp Panel`);
          this.loading = false;
        });
    });

    this.wordsSearchFormGroup = this.fb.group({
      word: this.word
    });

  }

}
