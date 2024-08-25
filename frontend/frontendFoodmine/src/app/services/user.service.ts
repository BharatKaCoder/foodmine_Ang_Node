import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constant/url';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CommanService } from './comman.service';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserSessionStorage());
  public userObservable$ = this.userSubject.asObservable();

  constructor(
    private _http:HttpClient, 
    private _toastr:ToastrService,
    private _commanService:CommanService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router:Router ) { }

  login(userLogin: IUserLogin): Observable<User> {
    return this._http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user:any) => {
          this.setUserInSessionStorage(user);
          this.userSubject.next(user);
          this._commanService.hide();
          this._toastr.success(
            `Welcome to foodStore ${user?.user.name || 'User'}`,
            'Login Successfully'
          );
        },
        error: (error: any) => {
          this._toastr.error(error.error?.error, 'Login failed');
        }
      })
    );
  }

  register(userResiter:IUserRegister):Observable<User> {
    return this._http.post<User>(USER_REGISTER_URL,userResiter).pipe(
      tap({
        next:(user:any)=>{
          this.setUserInSessionStorage(user);
          this.userSubject.next(user);
          this._toastr.success(
            `Welcome to foodStore ${user?.user.name || 'User'}`,
            `Successfully registered, Please logged in again!`
          )
        },
        error:(err)=>{ 
          this._toastr.error( err.error.error,`Registration failed`);
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User());
    sessionStorage.removeItem('LoggedUser');
    this._toastr.error('You have been logged out');
    this._router.navigate(['/']);
  }

  private setUserInSessionStorage(user:User) {
    sessionStorage.setItem('LoggedUser',JSON.stringify(user));
  }

  private getUserSessionStorage():any {
    if(isPlatformBrowser(this.platformId)) {
      const userJson = sessionStorage.getItem('LoggedUser');
      if(userJson) {
        return JSON.parse(userJson);
      } else {
        return new User();
      }
    }
  }

  currentUser():User {
    return this.userSubject.value;
  } 
}
