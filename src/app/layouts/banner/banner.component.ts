import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { animation } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  activeIndex: number = 0;
  private carouselIndex: number = 0; // Saving current index of the slide
  private pause: number = 3000; // Duration delay of the slide
  private animationSpeed: number = 1000; // Speed for per slide
  private count: number = -1; // Used to track current carousel index
  private width: number; // The slide's width
  // DOM
  private $carousel: any;
  private $carouselInner: any;
  private $carouselContainer: any;
  private $slides: any;
  private $indicators: any;
  // setInterval
  private interval: any;

  ngOnInit() {
    // cache DOM
    this.cacheDOM();
    // get and set width for images properly
    this.handleWidthOfImage();
    // If the window resize, images will have a new width
    this.windowResizeEvent();
    // Initialize events
    this.start();
    // If the user mouse moves on the image, the image will stop.
    // Otherwise, continue sliding
    this.$carouselInner.on('mouseenter', this.stop.bind(this)).on('mouseleave', this.start.bind(this));
    this.$carouselInner.find('.control').on('mouseenter', this.stop.bind(this));
  }

  cacheDOM() {
    this.$carousel = $('#main-carousel');
    this.$carouselInner = this.$carousel.find('.inner');
    this.$carouselContainer = this.$carouselInner.find('.slides');
    this.$slides = this.$carouselContainer.find('.item');
    this.$indicators = this.$carousel.find('.indicators');
  }

  handleWidthOfImage() {
    this.width = this.$carouselInner.width();
    this.$slides.css('width', this.width);
  }

  windowResizeEvent() {
    $(window).resize(() => {
      if (this.width !== this.$carouselInner.width()) {
        this.stop();
        this.handleWidthOfImage();
        this.start();
      }
    });
  }

  animate(animationDone: () => void, speed: number = this.animationSpeed) {
    this.$carouselContainer.animate({
      'margin-left': -(this.width * this.carouselIndex)
    }, speed, animationDone);
  }

  setIndicator() {
    this.activeIndex = this.carouselIndex;
  }

  start() {
    let animationDone = () => {
      this.carouselIndex++;
      this.count = this.carouselIndex;
      if (this.carouselIndex === this.$slides.length) {
        this.carouselIndex = 0;
        this.count = 0;
      }
    };

    let handler = () => {
      this.setIndicator();
      this.animate(animationDone);
    };

    this.interval = setInterval(handler, this.pause);
  }

  stop() {
    clearInterval(this.interval);
  }

  /**
   * @param isStart specified that will run start method or not
   */
  changeSlides(isStart: boolean = true) {
    this.stop();

    let animationDone = () => {
      this.setIndicator();
      if (isStart) {
        this.start();
      }
    };

    this.animate(animationDone, this.animationSpeed / 2);
  }

  controlClick(value) {
    // Preparing move next slide then user click this prev or next control
    if (this.carouselIndex === this.count) {
      this.carouselIndex -= 1;
      this.count = -1;
    }

    this.carouselIndex += value;

    if (this.carouselIndex < 0) {
      this.carouselIndex = this.$slides.length - 1;
    }
    else if (this.carouselIndex === this.$slides.length) {
      this.carouselIndex = 0;
    }
    this.changeSlides(false);
  }

  indicatorClick(index: number) {
    this.carouselIndex = index;
    this.changeSlides();
  }
}
