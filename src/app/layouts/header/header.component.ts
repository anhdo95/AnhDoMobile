import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showNav: boolean;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Toggle sidebar when the screen is smaller than 768 pixels
   * @param isShow Show is 'true' and hide is 'false'
   */
  showMobileNav(isShow: boolean) {
    this.showNav = isShow;
  }
}
