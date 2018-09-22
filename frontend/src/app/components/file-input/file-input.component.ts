import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropFile } from './services/DropFile';
import { FileInputService } from './services/file-input.service';
import { DropZoneState, DropZoneStates } from './services/FileInputState';
import { imageAnimation } from './util/image-animation';


@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FileInputComponent, multi: true}
  ],
  animations: [imageAnimation]
})
export class FileInputComponent implements OnInit, ControlValueAccessor {

  @Input() accept: string = "*";
  @ViewChild("file") file: ElementRef;

  id: string = "file-input-" + this.randomInputId();

  value: DropFile;
  fileName: string;
  draggable: boolean = false;
  dragover: boolean = false;
  dropZoneState: DropZoneState;

  constructor(private fis: FileInputService) {}
  ngOnInit() {
    this.fis.setAccept(this.accept);
    this.fis.dragover.subscribe(res => this.dragover = res);
    this.fis.dropZoneState.subscribe(res => this.dropZoneState = res);
  }


  onChange = (_: any) => {};


  writeValue(obj: any): void {
    this.value = obj;
    if(obj == null) {
      this.fis.setDropZoneState(DropZoneStates.DEFAULT);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}


  public getData(e: DropFile): void {
    this.value = e;
    this.onChange(e);
  }

  public parseFile(e): void {
    if(e.target.files && e.target.files[0]) {
      const f: File = e.target.files[0];
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        const file: DropFile = new DropFile({
          name: f.name,
          type: f.type,
          data: reader.result
        });
        this.fis.setDropZoneState(new DropZoneState("valid", f.name));
        this.value = file;
        this.onChange(file);
      };

    }
  }


  public clearInput(): void {
    this.value = null;
    this.fis.setDropZoneState(DropZoneStates.DEFAULT);
    this.file.nativeElement.value = "";
  }

  private randomInputId(): string {
    let res: string = "";

    for(let i = 0; i < 10; i++) {
      res += String.fromCharCode(97 + Math.floor(Math.random() * 25));
    }

    return res;
  }
}
