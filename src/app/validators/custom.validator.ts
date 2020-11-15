import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Product } from '../models/product.model';


export function ValidCode(size: number, products: Array<Product>, prefix?: string): ValidatorFn  {
    return (control: AbstractControl) => {
        let code = control.value;
        if ( prefix) {
            code = prefix.concat(control.value);
        } 

        if (code.length > 0) {

            /* if is a numer */
            if ( /^\d+$/.test(code) && code) {

                /* and have the right size */
                if ( code.length === size) {

                    /* and is valid */
                    if ( isInvalid(code)) {
                        return { isInvalid: true };
                    }

                    /* and the subcategory exist */
                    if ( subCategoryDoesntExist(code, products, prefix)) {
                        return { subCategoryDoesntExist: true };
                        
                    }

                    /* we check if already exists */
                    for(var i = 0; i < products.length; i++) {
                        if (products[i].code === Number(code)) {
                             return { exist: true };
                        }
                    }

                    /* if is not, its ok */
                    return null
                } else {
                    return { minvalue: true };
                }
            } else {
                return { notNumber: true };
            }
        }
    };
}

function isInvalid(code: string): boolean {
    for (var i = 1; i <= code.length; i++) {
        if (isOdd(i) && code.charAt(i-1) === '0') {
            if (Number(code.substring(i, code.length)) !== 0) {
                
                return true;
            }
        }
    }
    return false;
}

function subCategoryDoesntExist(code: string, products: Array<Product>, prefix?: string): boolean {
    let min = 0;
    if (prefix !== undefined) {
        min = prefix.length;
    }
    if ( !isFirstLevel(code)) {
        for (var i = 0; i < code.length; i++) {
            if (isEven(i) && code.charAt(i) !== '0'  && (i > min)) {
                
                let aux = '';
                for (var j = i-2; j < (code.length-2); j++) {
                    aux += '0';
                }
                let exist = products.find(product => product.code === Number(code.substring(0, i).concat(aux)));
                
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
 
function isOdd(n) {
    return Math.abs(n % 2) == 1;
}

function isEven(n) {
    return n % 2 == 0;
}

function isFirstLevel(code: string) {
    return ((Number(code.substring(0)) !== 0) && (Number(code.substring(1, code.length)) === 0))
}
