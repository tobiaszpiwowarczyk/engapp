import { Component, OnInit } from '@angular/core';
import { TabService } from '../service/tab.service';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent implements OnInit {

  constructor(
    private ts: TabService
  ) { }

  ngOnInit() {
    this.ts.clearTabView();
  }

}
