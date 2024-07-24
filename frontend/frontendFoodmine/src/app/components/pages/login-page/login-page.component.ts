import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {

  loginForm: FormGroup = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  isSubmitted: boolean = false;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  singInLink() {
    const wrapper = document.querySelector('.wrapper');
    const signInLink = document.querySelector('.signIn-link');
    if (signInLink && wrapper) {
      wrapper.classList.add('animate-signUp');
      wrapper.classList.remove('animate-signIn');
    }
  }

  singUpLink() {
    const wrapper = document.querySelector('.wrapper');
    const signUpLink = document.querySelector('.signUp-link');
    if (signUpLink && wrapper) {
      wrapper.classList.add('animate-signIn');
      wrapper.classList.remove('animate-signUp');
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
  }
}
