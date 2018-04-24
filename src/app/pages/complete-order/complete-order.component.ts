import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/Subscription';
import { OrderComplete } from '../../models/payment';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.scss'],
})
export class CompleteOrderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  orderComplete: OrderComplete;
  constructor(
    private dataService: DataService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadOrder();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadOrder() {
    this.subscription = this.dataService.currentCompleteOrder$.subscribe((result: OrderComplete) => {
      this.orderComplete = result;
    });
  }

  navigateHome() {
    this.router.navigateByUrl('/');
  }
}
