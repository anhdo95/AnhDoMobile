import { Component, OnInit } from '@angular/core';
import { FbService } from './../../services/fb.service';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from './header.service';
import { Menu, TargetLink } from '../../models/menu';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showNav: boolean;
  displayName: string;

  menus: Menu[];

  constructor(
    private dataService: DataService,
    private fbService: FbService,
    private router: Router,
    private toastr: ToastrService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.showCurrentUserLogged();
    this.loadMenus();
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

  navigateToLink(link: string) {
    this.router.navigate([link]);
  }

  loadMenus() {
    this.headerService.getMenus(menus => {
      if (menus) {
        this.menus = menus;
      }
    });
  }

  parseTargetLink(target: TargetLink): string {
    return TargetLink[target];
  }
}
