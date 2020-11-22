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
  public productsCopy: Array<Product>;
  public nivelMax: number;
  public loaded = false;

  public newProduct: Subject<Product> = new Subject();

  private subscriptions: Subscription = new Subscription();

  constructor(
    private homeService: HomeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public resetData(): void {
    if ( this.products.length === 0 && this.homeService.products.length === 0) {
      this.getData();
    } else {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: { reset: true}
      });

      const reset = dialogRef.componentInstance.acept.subscribe(() => {
        this.getData();
        reset.unsubscribe();
      });
    }
  }

  private getData(): void {
    this.homeService.getData().subscribe((res) => {
      if (res) {
        this.products = [];
        this.productsCopy = [];
        res.forEach( product => {
          this.products.push( new Product(product));
          this.productsCopy.push( new Product(product));
        });
        this.products.sort((a, b) => (a.code > b.code) ? 1 : -1);
        this.nivelMax = ((this.products[0].code.toString(10).length) / 2);
        this.loaded = true;
        this.homeService.products = this.productsCopy;
      }
    },
    (error) => {
      this.dialog.open(AlertDialogComponent);
    });
  }

  public addProduct(product: Product): void {
    this.newProduct.next(product);
  }

  public removeAll(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { remove: true}
    });

    const removeAll = dialogRef.componentInstance.acept.subscribe(() => {
      this.products = [];
      this.productsCopy = [];
      this.homeService.products = [];
      removeAll.unsubscribe();
    });
  }

}
