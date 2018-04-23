import { Component, OnInit } from '@angular/core';
import { FbService } from './../../services/fb.service';
import { DataService } from './../../services/data.service';
import { ConfigService } from '../../services/config.service';
import { HeaderService } from './header.service';
import { Menu, TargetLink } from '../../models/menu';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {
  showNav: boolean;
  displayName: string;
  menus: Menu[];
  products$: Observable<Product[]>;
  productList: Product[] = [];
  private searchText$ = new Subject<string>();

  constructor(
    private dataService: DataService,
    private fbService: FbService,
    private headerService: HeaderService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.showCurrentUserLogged();
    this.loadMenus();
    this.pipeSearchProducts();
  }

  /**
   * Toggle sidebar when the screen is smaller than 768 pixels
   * @param isShow Show is 'true' and hide is 'false'
   */
  showMobileNav(isShow: boolean) {
    this.showNav = isShow;
  }

  showCurrentUserLogged() {
    this.fbService.getCurrentUser(userInfo => {
      if (userInfo) {
        this.dataService.setCurrentUserLogin(userInfo.name);
      }
    });

    this.dataService.currentUserLogged$.subscribe(
      userName => {
        this.displayName = userName;
      });
  }

  logout() {
    this.fbService.logout();
  }

  loadMenus() {
    this.headerService.getMenus(menus => {
      if (menus) {
        this.menus = menus;
      }
    });
  }

  parseTargetLink(target: TargetLink): string {
    return TargetLink[target];
  }

  pipeSearchProducts() {
    this.products$ = this.searchText$.pipe(
      debounceTime(this.configService.get('debounceTime')), // wait 500ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore new term if same as previous term
       // switch to new search observable each time the term changes
      switchMap(term => this.headerService.searchProducts(term)));
    this.products$.subscribe(products => {
      this.productList = products;
    });
  }

  searchProducts(term: string): void {
    if (!term) {
      this.productList = [];
      return;
    }
    this.searchText$.next(term);
  }
}
