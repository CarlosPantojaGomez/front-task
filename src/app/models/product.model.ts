export class Product {
    code: number;
    name: string;

    constructor(data?) {
        this.code = data && data.code || '';
        this.name = data && data.name || '';
    }
}