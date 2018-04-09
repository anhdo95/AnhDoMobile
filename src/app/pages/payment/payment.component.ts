import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { HelperService } from './../../services/helper.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  messages: any;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private helperService: HelperService
  ) {
    this.messages = configService.get('messages');
  }

  ngOnInit() {
    this.setPaymentForm();
  }

  setPaymentForm() {
    const fullNamePattern = this.configService.get('patterns').validateFullName;
    this.paymentForm = this.fb.group({
      gender: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.pattern(fullNamePattern)]],
      phone: ['', [Validators.required, Validators.pattern('^(\\+84|0)\\d{9,10}$')]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(120)]],
    });
  }

  saveOrder() {
    if (this.paymentForm.invalid) {
      Object.values(this.paymentForm.controls).map(
        control => {
          if (control.invalid) {
            control.markAsTouched();
          }
        }
      );
      // Clear first-child because it's invalid class of this form
      this.helperService.scrollTop($('.ng-invalid:first-child').position().top);
      return;
    }
  }

}
