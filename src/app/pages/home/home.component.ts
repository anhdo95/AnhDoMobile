import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from './../../app.component';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product';
import { HomeService } from './home.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit, OnDestroy {
  productsBestOutstanding: Product[] = [];
  productsBestSelling: Product[] = [];

  constructor(
    private dataService: DataService,
    private homeService: HomeService,
    private helperService: HelperService
  ) {
    this.dataService.enableBanner(true);
  }

  ngOnInit() {
    this.loadProductsBestOutstanding();
    this.loadProductsBestSelling();
  }

  ngOnDestroy() {
    this.dataService.enableBanner(false);
  }

  loadProductsBestOutstanding() {
    this.homeService.getProductBestOutstanding(products => {
      if (products) {
        this.productsBestOutstanding = products;
      }
    });
  }

  loadProductsBestSelling() {
    this.homeService.getProductBestSelling(products => {
      if (products) {
        this.productsBestSelling = products;
      }
    });
  }

  navigate(url: string, param?: any) {
    this.helperService.navigate(url, param);
  }
}
