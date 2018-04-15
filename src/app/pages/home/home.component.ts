import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from './../../app.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private dataService: DataService
  ) {
    this.dataService.enableBanner(true);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dataService.enableBanner(false);
  }
}
