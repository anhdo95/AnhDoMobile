import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './details.service';
import { ProductDetail, Related } from '../../models/product';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DetailsService]
})
export class DetailsComponent implements OnInit {
  subscription: Subscription;
  details: ProductDetail;
  productsRelated: Related[];

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.getDetails(params['MetaTitle']);
    });
  }

  getDetails(metaTitle: string) {
    this.detailsService.getDetails(metaTitle, (details: ProductDetail) => {
      if (details) {
        this.details = details;
        this.getProductsRelated(details.Id);
      }
    });
  }

  getProductsRelated(id: number) {
    this.detailsService.getProductRelated(id, products => {
      if (products) {
        this.productsRelated = products;
      }
    });
  }

  addToCart(productId: number) {
    this.detailsService.addToCart(productId);
  }

  replaceImages(image: string) {
    return image.replace('Assets/Common/images/products/380x380/', '');
  }
}
