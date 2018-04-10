import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {

  private bannerComponent = new Subject<boolean>();
  enableBannerComponent$ = this.bannerComponent.asObservable();

  private currentUser = new Subject<any>();
  currentUserLogged$ = this.currentUser.asObservable();

  constructor() { }

  enableBanner(enabled: boolean) {
    this.bannerComponent.next(enabled);
  }

  setCurrentUserLogin(userName: string) {
    this.currentUser.next(userName);
  }
}
