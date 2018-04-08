import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {

  private bannerComponent = new Subject<boolean>();
  enableBannerComponent$ = this.bannerComponent.asObservable();

  constructor() { }

  enableBanner(enabled: boolean) {
    this.bannerComponent.next(enabled);
  }
}
