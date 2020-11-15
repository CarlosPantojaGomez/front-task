import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { ValidCode } from 'src/app/validators/custom.validator';
import { Product } from 'src/app/models/product.model';
import { HomeService } from 'src/app/services/home-service.service';

@Component({
  selector: 'app-creation-panel',
  templateUrl: './creation-panel.component.html',
  styleUrls: ['./creation-panel.component.scss']
})
export class CreationPanelComponent implements OnInit {
  
  @Input() size: number;
  @Input() products: Array<Product> = [];
  @Input() expansion = false
  @Input() prefix: string;

  @Output() addProduct = new EventEmitter();
  
  public productForm = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
  });
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.updateValidators();
  }

  private updateValidators(): void {
    if ( this.expansion) {
      this.productForm.controls.code.setValidators([Validators.required, ValidCode(this.size, this.products, this.prefix)]);
    } else {
      this.productForm.controls.code.setValidators([Validators.required, ValidCode(this.size, this.products)]);
    }

    this.productForm.controls.code.updateValueAndValidity();
  }

  public submit(): void {
    this.addProduct.emit(this.createFromForm());
    this.updateValidators();
  }

  private createFromForm(): Product {
    if ( this.expansion ) {
      const product = {
        code: Number( this.prefix.concat(this.productForm.get(['code']).value)),
        name: this.productForm.get(['name']).value
      };
      return product;
    } else {
      const product = {
        code: Number(this.productForm.get(['code']).value),
        name: this.productForm.get(['name']).value
      };
      return product;
    }
    
  }

}
