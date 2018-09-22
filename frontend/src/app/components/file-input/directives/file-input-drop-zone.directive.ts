import { Directive, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { FileInputService } from '../services/file-input.service';
import { DropZoneStates, DropZoneState } from '../services/FileInputState';
import { DropFile } from '../services/DropFile';

@Directive({ selector: '[appDropZone]' })
export class FileInputDropZoneDirective implements OnInit {


  @Output() onDrop: EventEmitter<any> = new EventEmitter<any>();


  private accept: string;




  constructor(
    private fis: FileInputService
  ) { }
  ngOnInit(): void {
    this.fis.accept.subscribe(a => this.accept = a);
  }



  @HostListener("dragover", ["$event"])
  public dragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.fis.setDragover(true);
    this.fis.setDropZoneState(DropZoneStates.DRAGOVER);
  }




  @HostListener("dragleave", ["$event"])
  public dragLeave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.fis.setDragover(false);
    this.fis.setDropZoneState(DropZoneStates.DEFAULT);
  }





  @HostListener("drop", ["$event"])
  public drop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();

    if(e.dataTransfer.files.length > 1) {
      this.fis.setDropZoneState(DropZoneStates.FILE_COUNT);
      return;
    }

    if(!this.accept.includes(e.dataTransfer.files[0].type)) {
      this.fis.setDropZoneState(DropZoneStates.INVALID_IMAGE);
      return;
    }



    const file: File = e.dataTransfer.files[0];
    const reader: FileReader = new FileReader();

    reader.readAsDataURL(e.dataTransfer.files[0]);

    reader.onload = () => {
      this.fis.setDropZoneState(new DropZoneState("valid", file.name));
      this.onDrop.emit(new DropFile({
        name: file.name,
        type: file.type,
        data: reader.result
      }));
    };

  }

}