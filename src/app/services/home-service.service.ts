import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  URL:string;
  extend: string;

  public products: Array<Product>;

  constructor(private http:HttpClient) { 
    this.URL = 'https://gist.githubusercontent.com/';
  }

  /* method to get te JSON file */
  public getData(): Observable<Product[]> {
    this.extend = this.URL + 'jakobt/8b44844ae0101949d7117a37f2d44161/raw/452dc8193f3279b36c7aa78f0c6d15b8114e3800/flatlist.json';

    return this.http.get<any>(this.extend);
  }
}
