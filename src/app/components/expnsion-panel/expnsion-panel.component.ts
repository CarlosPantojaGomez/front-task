import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-expnsion-panel',
  templateUrl: './expnsion-panel.component.html',
  styleUrls: ['./expnsion-panel.component.scss']
})
export class ExpnsionPanelComponent implements OnInit, OnChanges , OnDestroy {

  @Input() products: Array<Product> = [];
  @Input() level: number;
  @Input() nivelMax: number;
  @Input() newproduct: Subject<Product>;

  public productsCopy: Array<Product> = [];

  public productsToPrint: Array<Product> = [];
  public children: Array<Array<Product>> = [];

  public isExpanded: Array<boolean> = [];

  constructor() { }

  ngOnInit(): void {
    this.print();
    if ( this.newproduct ) {
      this.newproduct.subscribe(product => {
        this.refreshList(product);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products) {
      this.print();
    }
  }
  
  ngOnDestroy(): void {
    if (this.newproduct) {
      this.newproduct.unsubscribe();
    }
  }
  
  private print(): void {
    this.productsCopy = [];
    this.productsToPrint = [];
    this.children = [];
    
    this.products.forEach((product) =>{
      this.decide(product);
    });
    
  }

  /* decice to print the element or not */
  public decide(product: Product): boolean {
    if (this.sameLevel(product.code, this.level)) {
      this.productsToPrint.push(product);
      this.isExpanded.push(false);
      this.setChild(Number(product.code.toString(10).substring(this.level*2 - 2, this.level*2 )), 
        this.level*2 - 2, this.level*2 );
      return true;
    } else {
      return false;
    }
  }

  /* create the children of a printed product  */
  private setChild(n: number, start, end): void {
    this.productsCopy = this.products.filter(product =>{
      if (Number(product.code.toString(10).substring(start, end)) === n && !this.sameLevel(product.code, this.level)) {
        return product
      }
    });
    
    this.children.push(this.productsCopy);
  }

  /* to stop the loop */
  public continue(): boolean {
    return this.nivelMax > this.level;
  }

  /* determines if a code belong to a level */
  private sameLevel(code: number, level: number): boolean {
    
    const levelx2 = level*2;
    
    if ( (Number(code.toString(10).substring(levelx2)) === 0)) {
      if ( level <= 1 && (Number(code.toString(10).substring(0, 2))) !== 0) {
        return true;
      } else  {
        if ( (Number(code.toString(10).substring(levelx2 - 2, levelx2))) === 0) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  public refreshList(product: Product): void {
    this.products.push(product);
    this.print();
  }
}
