import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MessageContainerComponent } from '../../../../../../components/message/message-container/message-container.component';
import { Word } from '../../../../../../services/word/Word';
import { WordService } from '../../../../../../services/word/word.service';
import { Unit } from '../../../../../main/home/components/unit/Unit';
import { ModalService } from '../../services/modal.service';
import { LoaderComponent } from './../../../../../../components/loader/loader.component';
import { ModalComponent } from './../../../../../../components/modal/modal.component';
import { UnitService } from './../../../../../../services/unit/unit.service';
import { TableSortableService, FilterProperty } from '../../../../../../components/table-sortable-filter/services/table-sortable.service';


@Component({
  selector: 'app-units-single',
  templateUrl: './units-single.component.html',
  styleUrls: ['./units-single.component.scss', "../../../../scss/profile.scss"]
})
export class UnitsSingleComponent implements OnInit {

  errors: any;

  unit: Unit;
  loading: boolean = true;
  deletionWordNumber: number;

  wordsSearchFormGroup: FormGroup;

  searchWord: FormControl = new FormControl("");

  filterProperties: FilterProperty[] = [];

  @ViewChild("loader") loader: LoaderComponent;
  @ViewChild("boxLoader") boxLoader: LoaderComponent;
  @ViewChild("profileLoader") profileLoader: LoaderComponent;
  @ViewChild("approveModal") approveModal: ModalComponent;
  @ViewChild("message") message: MessageContainerComponent;

  constructor(
    private us: UnitService,
    private route: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private ms: ModalService,
    private wordService: WordService,
    private tss: TableSortableService,
    public sanitizer: DomSanitizer
  ) { }
  ngOnInit() {
    this.route.params.subscribe(param => {
      this.us.findById(param.id)
        .subscribe((unit: Unit) => {
          this.unit = unit;
          this.tss.initData(unit.words);

          this.tss.data.subscribe(data => {
            this.unit.words = data;
            this.title.setTitle(`Rozdział: ${unit.name} - EngApp Panel`);
            this.ms.setMainUrl("/admin/units/" + unit.id);
          });

          this.tss.retrieveFilterProperties()
            .subscribe(props => this.filterProperties = props);

        }, err => this.errors = err, () => this.loading = false);
    });

    this.wordsSearchFormGroup = this.fb.group({
      word: this.searchWord
    });
  }


  public openEditModal(): void {
    this.ms.setData({
      name: "editUnitModal",
      data: this.unit
    });
  }

  public editUnit(unit: Unit): void {
    this.unit.name = unit.name;
    this.unit.color = unit.color;
    this.unit.published = unit.published;
    this.loader.hide();
    this.message.show("Rozdział został zaktualizowany pomyślnie");
  }



  public openNewWordModal(): void {
    this.ms.setData({ name: "addWordModal" });
  }

  public addWord(word: Word): void {
    word.wordNumber = this.unit.words.length + 1;
    this.unit.wordsCount += 1;
    this.unit.words.push(word);
    this.boxLoader.hide();
    this.message.show("Słówko zostało dodane pomyślnie");
  }




  public openEditWordModal(word: Word): void {
    this.ms.setData({
      name: "editWordModal",
      data: {
        unitId: this.unit.id,
        wordNumber: word.wordNumber,
        polish: word.polish,
        english: word.english
      }
    });
  }

  public editWord(word: Word): void {
    this.unit.words[word.wordNumber - 1] = word;
    this.boxLoader.hide();
    this.message.show("Słówko zostało zaktualizowane pomyślnie");
  }



  public openApproveModal = (wordNumber: number): void => {
    this.approveModal.show();
    this.deletionWordNumber = wordNumber;
  }

  public deleteWord(): void {
    this.boxLoader.show();
    this.wordService.deleteWord(this.unit.id, this.deletionWordNumber)
      .subscribe(res => {
        this.unit.words.splice(this.deletionWordNumber - 1, 1);
        this.unit.wordsCount--;
        this.boxLoader.hide();
        this.message.show(res.state);
      });
  }



  public openChangeImageModal(): void {
    this.ms.setData({ name: "changeImageModal" });
  }

  public changeImage(e: Unit): void {
    this.unit.image = e.image;
    this.profileLoader.hide();
    this.message.show("Zdjęcie zostało zmienione pomyślnie");
  }

  public toggleFilter = (): void => this.tss.toggleFilter();
}
