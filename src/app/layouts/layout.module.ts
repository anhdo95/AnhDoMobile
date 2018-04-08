import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, BannerComponent, FooterComponent],
  exports: [CommonModule, HeaderComponent, BannerComponent, FooterComponent]
})
export class LayoutModule { }
