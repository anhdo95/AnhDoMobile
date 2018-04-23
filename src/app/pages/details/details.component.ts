import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './details.service';
import { ProductDetail } from '../../models/product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DetailsService]
})
export class DetailsComponent implements OnInit {
  details: ProductDetail;
  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService
  ) { }

  ngOnInit() {
    const metaTitle = this.route.snapshot.paramMap.get('MetaTitle');
    this.getDetails(metaTitle);
  }

  getDetails(metaTitle: string) {
    this.detailsService.getDetails(metaTitle, details => {
      if (details) {
        this.details = details;
      }
    });
  }

  replaceImages(image: string) {
    return image.replace('Assets/Common/images/products/380x380/', '');
  }
}
