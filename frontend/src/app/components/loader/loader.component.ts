import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() noFill: boolean = false;

  visible: boolean = false;

  loaderWidth: number = 50;
  loaderStrokeWidth: number = 6;

  constructor() { }

  ngOnInit() {
  }

  public show(): void {
    this.visible = true;
  }

  public hide(): void {
    this.visible = false;
  }

}
