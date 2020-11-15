import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from 'src/app/services/home-service.service';
import { Product } from 'src/app/models/product.model';
import { Subscription, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public products: Array<Product>;
  public nivelMax: number;
  public loaded = false;

  public newProduct: Subject<Product> = new Subject();

  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private homeService: HomeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.homeService.getData().subscribe((res) => {
      if (res) {
        this.products = [];
        res.forEach( product => {
          this.products.push( new Product(product));
        });
        this.nivelMax = ((this.products[0].code.toString(10).length)/2);
        this.loaded = true;
        this.homeService.products = this.products;
      }
    },
    (error)=> {
      this.dialog.open(AlertDialogComponent);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public addProduct(product: Product): void {
    this.newProduct.next(product);
  }

}
