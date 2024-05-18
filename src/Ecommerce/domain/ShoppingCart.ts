import { Product } from './Product';

export class ShoppingCart {
  private MAX_ITEM: number = process.env.MAX_ITEMS_FROM_CART ? parseInt(process.env.MAX_ITEMS_FROM_CART) : 12;
  private products!: Product[] | [];

  public constructor({ products }: { products?: Product[] }) {
    this.products = products ? products : [];
  }

  public updateCart(products: Product[] | []): void {
    if (products.length === this.MAX_ITEM) {
      throw new Error(`
        I reach the maximum number of items ${this.MAX_ITEM}`);
    }

    this.products = products;
  }

  public getAllProducts(): string[] {
    return this.products.map((product: Product) => product.getId());
  }

  public getAmount(): number {
    const prices = this.products.map((product: Product) => product.getPrice());

    return prices.reduce((price, currentValue) => price + currentValue, 0);
  }
}
