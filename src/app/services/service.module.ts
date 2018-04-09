import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { NgProgressModule } from 'ngx-progressbar';
import { LoadingBarService } from './loading-bar.service';
import { ConfigService } from './config.service';

@NgModule({
  imports: [
    HttpClientModule,
    NgProgressModule
  ],
  exports: [
    NgProgressModule
  ],
  providers: [
    DataService,
    LoadingBarService,
    ConfigService
  ]
})
export class ServiceModule { }
