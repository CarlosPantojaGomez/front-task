import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroupDirective } from '@angular/forms';

import { Product } from 'src/app/models/product.model';
import { HomeService } from 'src/app/services/home-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creation-panel',
  templateUrl: './creation-panel.component.html',
  styleUrls: ['./creation-panel.component.scss']
})
export class CreationPanelComponent implements OnInit, OnDestroy {

  @Input() size: number;
  @Input() expansion = false;
  @Input() prefix: string;

  @Output() addProduct = new EventEmitter();
  @Output() resetData = new EventEmitter();

  public productForm = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
  });

  private refresh: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.updateValidators();

    this.refresh = this.homeService.refresh.subscribe( () => {
      this.updateValidators();
    });
  }

  ngOnDestroy(): void {
    this.refresh.unsubscribe();
  }

  private updateValidators(): void {
    if ( this.expansion) {
      this.productForm.controls.code.setValidators([Validators.required,
        this.homeService.validCode(this.size, this.prefix)]);
    } else {
      this.productForm.controls.code.setValidators([Validators.required,
        this.homeService.validCode(this.size)]);
    }
    this.productForm.controls.code.updateValueAndValidity();
  }

  public submit(): void {
    this.addProduct.emit(this.createFromForm());
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.updateValidators();
    this.snackBar.open('Success', 'Close', {
      duration: 2000,
    });
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

  public reset(): void {
    this.resetData.emit();
  }

}
