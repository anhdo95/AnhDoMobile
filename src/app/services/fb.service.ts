import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { FacebookService, InitParams, LoginResponse, LoginStatus } from 'ngx-facebook';
import { LoadingBarService } from './loading-bar.service';
import secrets from '../../assets/data/secrets';

enum Status {
  connected = 'connected'
}

@Injectable()
export class FbService {

  constructor(
    private fb: FacebookService,
    private dataService: DataService,
    private loading: LoadingBarService,
    private router: Router
  ) {
    const initParams: InitParams = {
      appId: secrets.facebookAppId,
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }

  getCurrentUser(callback: (userInfo) => void) {
    this.loading.start();
    this.getLoginStatus(status => {
      if (status === Status.connected) {
        this.getUserInfo(userInfo => {
          if (userInfo) {
            this.dataService.setCurrentUserLogin(userInfo.name);
            this.loading.stop();
          }
        });
      }
    });
  }

  getUserInfo(callback: (userInfo) => void) {
    this.loading.start();
    this.fb.api('/me')
      .then((userInfo: any) => {
        callback(userInfo);
        this.loading.stop();
      }).catch((error: any) => console.error(error));
  }

  getLoginStatus(callback: (status: string) => void) {
    this.loading.start();
    this.fb.getLoginStatus()
      .then((res: LoginStatus) => {
        callback(res.status);
        this.loading.stop();
      }).catch((error: any) => console.error(error));
  }

  login(returnUrl: string = '/') {
    this.fb.login()
      .then((res: LoginResponse) => {
        if (res.status === Status.connected) {
          this.getUserInfo(userInfo => {
            if (userInfo) {
              this.dataService.setCurrentUserLogin(userInfo.name);
              this.router.navigateByUrl(returnUrl);
            }
          });
        }
      }).catch((error: any) => console.error(error));
  }

  logout() {
    this.loading.start();
    this.fb.logout()
      .then((res: any) => {
        this.dataService.setCurrentUserLogin(null);
        this.loading.stop();
      }).catch((error: any) => console.error(error));
  }
}
