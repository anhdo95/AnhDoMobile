import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  ngOnInit() {
  }

  scrollTop() {
    $('html, body').animate({
      scrollTop: 0
  }, 500);
  }
}
