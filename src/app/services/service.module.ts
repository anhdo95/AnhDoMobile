import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { ApiService } from './api.service';
import { NgProgressModule } from 'ngx-progressbar';
import { LoadingBarService } from './loading-bar.service';

@NgModule({
  imports: [
    HttpModule,
    NgProgressModule
  ],
  exports: [
    NgProgressModule
  ],
  providers: [
    DataService,
    ApiService,
    LoadingBarService
  ]
})
export class ServiceModule { }
