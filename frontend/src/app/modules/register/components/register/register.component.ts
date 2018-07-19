import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private title: Title,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.title.setTitle("EngApp - Zarejestruj się");

    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      email: ['']
    });

  }


  public register(): void {
    // todo: create functionality
  }

}
