import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { LoaderComponent } from '../../partials/loader/loader.component';
import { CommanService } from '../../../services/comman.service';
import { error } from 'node:console';
import { delay, of } from 'rxjs';
import { confirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule,LoaderComponent ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {

  loginForm: FormGroup = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  registerForm: FormGroup = new FormGroup ({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  isSubmitted: boolean = false;
  returnUrl:string = '';
  isRegSubmitted: boolean = false;
  passwordFieldType:string = 'password';
  passwordFieldIcon: string = '🙈';
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder, 
    private _userService:UserService,
    private _activatedRoute:ActivatedRoute,
    private _router:Router,
    private _commanService:CommanService
    ) {}

  ngOnInit(): void {
    // login form 
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'];

    // registration form
    this.registerForm = this._fb.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      address:['',[Validators.required]]
    }, { validator: confirmPasswordValidator('password','confirmPassword') });
  }

  // get password() {
  //   return this.registerForm.get('password');
  // }

  // get confirmPassword() {
  //   return this.registerForm.get('confirmPassword');
  // }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get fun(): {[key:string]: AbstractControl } {
    return this.registerForm.controls;
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

  // login submit button
  onSubmit() {
    this.isSubmitted = true;
    this.isRegSubmitted = false;
    if (this.loginForm.invalid) {
      return;
    } else {
      this._commanService.showLoader();
      this._userService.login({email:this.f['email'].value, password:this.f['password'].value})
      .subscribe(()=>{ this._router.navigateByUrl(this.returnUrl)});
      this._commanService.hideLoader();
    }
  }

  // registration submit button
  regSubmit() {
    this.isRegSubmitted = true;
    this.isSubmitted = false;
    if (this.registerForm.invalid) {
      return;
    } else {
      this._userService.register({
        name:this.fun['name'].value,
        email:this.fun['email'].value,
        address:this.fun['address'].value,
        password:this.fun['password'].value,
        confirmPassword:this.fun['confirmPassword'].value,
      }).subscribe(()=> {
        of('').pipe(delay(200)).subscribe(()=>{
          this.singInLink();
        })
      });
    }
  }

  close() {
    this.closeModal.emit();
  }

  // password showhide functionality
  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordFieldIcon = this.passwordFieldType === 'password' ? '🙈':'👁️';
  }
}
