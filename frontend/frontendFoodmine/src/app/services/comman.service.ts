import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  private modalVisibility = new BehaviorSubject<boolean>(false);
  isModalVisible$ = this.modalVisibility.asObservable();

  private loaderSubject = new BehaviorSubject<boolean>(false);
  // public loaderObservable$ = this.loaderSubject.asObservable();
  constructor() { }

  show() {
    this.modalVisibility.next(true);
  }

  hide() {
    this.modalVisibility.next(false);
  }

  showLoader() {
    this.loaderSubject.next(true);
  }

  hideLoader() {
    this.loaderSubject.next(false);
  }

  get isLoading() {
    return this.loaderSubject.asObservable();
  }
}
