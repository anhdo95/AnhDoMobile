import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, BannerComponent],
  exports: [CommonModule, HeaderComponent, BannerComponent]
})
export class LayoutModule { }
