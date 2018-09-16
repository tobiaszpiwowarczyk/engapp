import { ModalFooterType } from './util/ModalFooterType';
import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventTargetUtils } from '../../util/EventTargetUtils';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./scss/modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string = "";

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onApprove: EventEmitter<boolean> = new EventEmitter<boolean>();

  shown: boolean = false;
  preventApprove: boolean = false;
  footerType: ModalFooterType = ModalFooterType.OK_CANCEL;

  constructor() {}
  ngOnInit() {}

  @HostListener("click", ["$event"])
  public hideWhole(e): void {
    if(!EventTargetUtils.reachedTarget(e, "modal__box")) this.hide();
  }

  @HostListener("window:keydown", ["$event"])
  public approveModal(e: KeyboardEvent): void {
    if(!this.shown) return;

    const key: number = e.keyCode || e.which;

    if(key == 13) {
      this.approve();
    }
    else if(key == 27) {
      this.hide();
    }
  }


  public hide(): void {
    document.querySelector("body").classList.remove("modal--shown");
    this.shown = false;
    this.onClose.emit(true);
  }

  public show(): void {
    document.querySelector("body").classList.add("modal--shown");
    this.shown = true;
  }

  public approve(): void {
    if(!this.preventApprove) {
      this.onApprove.emit(true);
      this.hide();
    }
  }
}
