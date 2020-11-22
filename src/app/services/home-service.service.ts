import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private URL: string;
  private extend: string;

  public refresh: EventEmitter<number> = new EventEmitter();
  public sort: EventEmitter<number> = new EventEmitter();

  public removeProduct: EventEmitter<Product> = new EventEmitter();

  public products: Array<Product>;

  constructor(private http: HttpClient) {
    this.URL = 'https://gist.githubusercontent.com/';
  }

  public sortProducts(): void {
    /* this.products.sort((a, b) => (a.code > b.code) ? 1 : -1); */
    this.sort.emit();
  }

  /* method to get te JSON file */
  public getData(): Observable<Product[]> {
    this.extend = this.URL + 'jakobt/8b44844ae0101949d7117a37f2d44161/raw/452dc8193f3279b36c7aa78f0c6d15b8114e3800/flatlist.json';

    return this.http.get<any>(this.extend);
  }

  /* Custom validator */
  public validCode(size: number, prefix?: string): ValidatorFn  {
    return (control: AbstractControl) => {
        let code = control.value;
        if ( prefix) {
            code = prefix.concat(control.value);
        }

        if (code && code.length > 0) {

            /* if is a numer */
            if ( /^\d+$/.test(code) && code) {

                /* and have the right size */
                if ( code.length === size) {

                    /* and is valid */
                    if ( this.isInvalid(code)) {
                        return { isInvalid: true };
                    }

                    /* and the subcategory exist */
                    if ( this.subCategoryDoesntExist(code, prefix)) {
                        return { subCategoryDoesntExist: true };
                    }

                    /* we check if already exists */
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < this.products.length; i++) {
                        if (this.products[i].code === Number(code)) {
                             return { exist: true };
                        }
                    }

                    /* if is not, its ok */
                    return null;
                } else {
                    return { minvalue: true };
                }
            } else {
                return { notNumber: true };
            }
        }
    };
  }

  private isInvalid(code: string): boolean {
    for (let i = 1; i <= code.length; i++) {
        if (isOdd(i) && code.charAt(i - 1) === '0') {
            if (Number(code.substring(i, code.length)) !== 0) {
              return true;
            }
        }
    }
    return false;
  }

  private subCategoryDoesntExist(code: string, prefix?: string): boolean {
    let min = 0;
    if (prefix !== undefined) {
        min = prefix.length;
    }
    if ( !isFirstLevel(code)) {
        for (let i = 0; i < code.length; i++) {
            if (isEven(i) && code.charAt(i) !== '0'  && (i > min)) {
              let aux = '';
              for (let j = i - 2; j < (code.length - 2); j++) {
                  aux += '0';
              }
              const exist = this.products.find(product => product.code === Number(code.substring(0, i).concat(aux)));

              if ( exist === undefined) {
                  return true;
              }
            }
        }
        return false;
    } else {
        return false;
    }
  }
}

function isOdd(n) {
  return Math.abs(n % 2) === 1;
}

function isEven(n) {
  return n % 2 === 0;
}

function isFirstLevel(code: string) {
  return ((Number(code.substring(0)) !== 0) && (Number(code.substring(1, code.length)) === 0));
}




