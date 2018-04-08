import { Injectable } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class LoadingBarService {

  constructor(
    private ngProgress: NgProgress
  ) { }

  start() {
    this.ngProgress.start();
  }

  stop() {
    this.ngProgress.done();
  }
}
