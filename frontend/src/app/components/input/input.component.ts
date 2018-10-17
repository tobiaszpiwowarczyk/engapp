import { ErrorMessageFactory } from './validator/ErrorMessageFactory';
import { LoaderComponent } from '../loader/loader.component';
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() icon: string;
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  @Input() disabled: boolean = false;
  @Input() value: string = "";
  @Input() errors: any[] = [];
  @Input() control: FormControl;

  fluid: boolean = false;
  compact: boolean = false;
  focused: boolean = false;

  @ViewChild("inputLoader") inputLoader: LoaderComponent;

  constructor(
    private el: ElementRef
  ) { }
  ngOnInit() {
    this.el.nativeElement.querySelector("input").addEventListener("focus", () => this.focus(), false);
    this.el.nativeElement.querySelector("input").addEventListener("blur", () => this.blur(), false);
    this.inputLoader.loaderWidth = 30;
  }

  propagateChange = (_: any) => { };


  public change(value: string): void {
    this.value = value;
    this.propagateChange(value);
  }

  public focus(): void {
    setTimeout(() => this.el.nativeElement.querySelector("input").focus(), 1);
    this.focused = true;
  }

  public blur(): void {
    this.el.nativeElement.querySelector("input").blur();
    this.focused = false;
  }


  public format(input: any, ...args: string[]): string {
    return input.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  }

  public getError(type: string): string {
    return (this.control != null && this.control.errors != null) ? this.format(
      ErrorMessageFactory.getErrorMessage(type).message,
      this.control.errors.minlength ? this.control.errors.minlength.actualLength : null,
      this.control.errors.minlength ? this.control.errors.minlength.requiredLength : null
    ) : null;
  }


  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(): void { }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
