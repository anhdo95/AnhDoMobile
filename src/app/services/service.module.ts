import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { NgProgressModule } from 'ngx-progressbar';
import { LoadingBarService } from './loading-bar.service';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';

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
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true
    },
    ApiService
  ]
})
export class ServiceModule { }
