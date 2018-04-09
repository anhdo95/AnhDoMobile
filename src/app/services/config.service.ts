import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private settings: any;

  constructor(
    private http: HttpClient
  ) { }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      const configUrl = 'assets/data/config.json';
      this.http.get(configUrl).subscribe(
        data => {
          this.settings = data;
          resolve(true);
        },
        error => {
          reject(error);
        });
    }).catch(error => {
      console.error(new Error(error.message || error));
    });
  }

  get(setting) {
    return this.settings[setting];
  }
}
