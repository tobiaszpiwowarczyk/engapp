import { Component, OnInit, Input, ElementRef, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true}
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() icon: string;
  @Input() type: string = "text";
  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  @Input() value: string;

  focused: boolean = false;

  constructor(
    private el: ElementRef
  ) {}
  ngOnInit() {
    this.el.nativeElement.querySelector("input").addEventListener("focus", () => this.focus(), false);
    this.el.nativeElement.querySelector("input").addEventListener("blur", () => this.blur(), false);
  }

  propagateChange = (_: any) => {};


  public change(value: string): void {
    this.value = value;
    this.propagateChange(value);
  }

  public focus(): void {
    this.el.nativeElement.querySelector("input").focus();
    this.focused = true;
  }

  public blur(): void {
    this.el.nativeElement.querySelector("input").blur();
    this.focused = false;
  }


  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
