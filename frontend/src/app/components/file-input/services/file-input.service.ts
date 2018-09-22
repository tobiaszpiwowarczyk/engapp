import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { DropZoneState, DropZoneStates } from './FileInputState';

@Injectable()
export class FileInputService {

  accept: BehaviorSubject<string> = new BehaviorSubject<string>("*");
  dragover: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: BehaviorSubject<any> = new BehaviorSubject<any>({});
  dropZoneState: BehaviorSubject<DropZoneState> = new BehaviorSubject<DropZoneState>(DropZoneStates.DEFAULT);

  constructor() {}

  public setAccept(accept: string): void {
    this.accept.next(accept);
  }

  public setDragover(dragover: boolean): void {
    this.dragover.next(dragover);
  }

  public setData(data: any): void {
    this.data.next(data);
  }

  public setDropZoneState(dropZoneState: DropZoneState): void {
    this.dropZoneState.next(dropZoneState);
  }
}