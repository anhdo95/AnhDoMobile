import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { OrderComplete } from '../models/payment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private bannerComponent = new Subject<boolean>();
  enableBannerComponent$ = this.bannerComponent.asObservable();

  private currentUser = new Subject<any>();
  currentUserLogged$ = this.currentUser.asObservable();

  private completeOrder = new BehaviorSubject(new OrderComplete());
  currentCompleteOrder$ = this.completeOrder.asObservable();

  constructor() { }

  enableBanner(enabled: boolean) {
    this.bannerComponent.next(enabled);
  }

  setCurrentUserLogin(userName: string) {
    this.currentUser.next(userName);
  }

  setCurrentCompleteOrder(orderComplete: OrderComplete) {
    this.completeOrder.next(orderComplete);
  }
}
