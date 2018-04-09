import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()
export class HelperService {

  scrollTop(position: number, animationSpeed = 500, selector: string = 'html, body') {
    $(selector).animate({
      scrollTop: position
    }, animationSpeed);
  }
}
