import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  enableBanner: boolean;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.showBanner();
  }

  showBanner() {
    this.dataService.enableBannerComponent$.subscribe(
      enabled => {
        this.enableBanner = enabled;
      });
  }
}
