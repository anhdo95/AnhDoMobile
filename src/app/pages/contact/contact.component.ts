import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../services/config.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  reCAPTCHASiteKey: string;

  constructor(
    configService: ConfigService
  ) {
    this.reCAPTCHASiteKey = configService.get('reCAPTCHASiteKey');
  }

  ngOnInit() {
  }

  resolvedReCAPTCHA(response: string) {
  }
}
