import { Input, Output, EventEmitter } from '@angular/core';
import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


export const SWITCH_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
};


@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [SWITCH_VALUE_ACCESSOR]
})
export class SwitchComponent implements OnInit, ControlValueAccessor {

  @Input() value: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onchange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}
  ngOnInit() {}

  private propagateChange = (_:any) => {};

  writeValue(obj: boolean): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  public toggle(): void {
    this.value = !this.value;
    this.propagateChange(this.value);
    this.onchange.emit(this.value);
  }

}
