import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Injectable()
export class HelperService {

  constructor(private router: Router) {}

  scrollTop(position: number, animationSpeed = 500, selector: string = 'html, body') {
    $(selector).animate({
      scrollTop: position
    }, animationSpeed);
  }

  navigate(url: string, param?: any) {
    if (param) {
      this.router.navigate([url, param]);
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
