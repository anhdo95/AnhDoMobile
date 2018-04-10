import { Component, OnInit } from '@angular/core';
import { FbService } from './../../services/fb.service';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showNav: boolean;
  displayName: string;

  constructor(
    private dataService: DataService,
    private fbService: FbService
  ) { }

  ngOnInit() {
    this.showCurrentUserLogged();
  }

  /**
   * Toggle sidebar when the screen is smaller than 768 pixels
   * @param isShow Show is 'true' and hide is 'false'
   */
  showMobileNav(isShow: boolean) {
    this.showNav = isShow;
  }

  showCurrentUserLogged() {
    this.fbService.getCurrentUser(userInfo => {
      if (userInfo) {
        this.dataService.setCurrentUserLogin(userInfo.name);
      }
    });

    this.dataService.currentUserLogged$.subscribe(
      userName => {
        this.displayName = userName;
      });
  }

  logout() {
    this.fbService.logout();
  }
}
