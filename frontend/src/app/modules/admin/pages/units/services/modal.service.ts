import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ModalData {
  name: string;
  data: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

@Injectable()
export class ModalService {

  mainURL: BehaviorSubject<string> = new BehaviorSubject<string>("");
  modalData: BehaviorSubject<ModalData> = new BehaviorSubject<ModalData>(new ModalData());

  constructor() { }

  public setData(modalData: ModalData): void {
    this.modalData.next(modalData);
  }

  public resetData(): void {
    this.modalData.next(new ModalData());
  }

  public setMainUrl = (url: string): void => this.mainURL.next(url);
}