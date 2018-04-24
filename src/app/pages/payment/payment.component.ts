import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { HelperService } from './../../services/helper.service';
import { PaymentService } from './payment.service';
import * as $ from 'jquery';
import { Province, District } from '../../models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [PaymentService]
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  messages: any;
  provinces: Province[];
  districts: District[];

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private helperService: HelperService,
    private paymentService: PaymentService
  ) {
    this.messages = configService.get('messages');
  }

  ngOnInit() {
    this.setPaymentForm();
    this.loadProvinces();
  }

  setPaymentForm() {
    const fullNamePattern = this.configService.get('patterns').validateFullName;
    this.paymentForm = this.fb.group({
      gender: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.pattern(fullNamePattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.configService.get('patterns').validateVietnamesePhone)]],
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

  loadProvinces() {
    this.paymentService.getProvinces(provinces => {
      if (provinces) {
        this.provinces = provinces;
      }
    });
  }

  loadDistricts() {
    let provinceId = this.paymentForm.get('city').value;
    this.paymentService.getDistricts(provinceId, districts => {
      if (districts) {
        this.districts = districts;
      }
    });
  }
}
