import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from './../../services/config.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  reCAPTCHASiteKey: string;
  contactForm: FormGroup;
  messages: any;

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder
  ) {
    this.reCAPTCHASiteKey = configService.get('reCAPTCHASiteKey');
    this.messages = configService.get('messages');
  }

  ngOnInit() {
    this.setContactForm();
  }

  resolvedReCAPTCHA(response: string) {
  }

  setContactForm() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(this.configService.get('patterns').validateFullName)]],
      phone: ['', [Validators.required, Validators.pattern(this.configService.get('patterns').validateVietnamesePhone)]],
      email: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required]],
      reCaptcha: ['', [Validators.required]]
    });
  }

  saveContact() {
    if (this.contactForm.invalid) {
      Object.values(this.contactForm.controls).map(
        control => {
          if (control.invalid) {
            control.markAsTouched();
          }
        }
      );
      return;
    }
  }
}
