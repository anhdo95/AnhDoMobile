import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../services/config.service';
import { FbService } from '../../services/fb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(
    private configService: ConfigService,
    private fbService: FbService
  ) { }

  ngOnInit() {
    this.getLoginStatus();
  }

  getLoginStatus() {
    this.fbService.getLoginStatus(status => {
      if (status) {
        console.log(status);
        this.isLoggedIn = status === this.configService.get('status').connected;
      }
    });
  }

  onLoginFacebookClick() {
    this.fbService.login();
  }
}
