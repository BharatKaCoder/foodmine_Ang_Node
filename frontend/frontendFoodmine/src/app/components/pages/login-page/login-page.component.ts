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

  isSubmitted: boolean = false;
  returnUrl:string = '';
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
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'];
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
    } else {
      this._commanService.showLoader();
      this._userService.login({email:this.f['email'].value, password:this.f['password'].value})
      .subscribe(()=>{ this._router.navigateByUrl(this.returnUrl)});
      this._commanService.hideLoader();
    }
  }

  close() {
    this.closeModal.emit();
  }
}
