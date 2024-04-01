import { uuid as uuidv4 } from "uuidv4";

import { Price } from "./Price";

export class Product {
  private readonly uuid: string;
  private readonly name: string;
  private readonly seller: string;
  private readonly price: Price;

  public constructor(name: string, price: Price, seller: string) {
    this.uuid = uuidv4();
    this.name = name;
    this.price = price;
    this.seller = seller;
  }

  public static create(name: string, price: number, seller: string): Product {
    if (name.length < 10 || name.length > 200) {
      throw new Error(
        name.length < 10
          ? `Minimum 10 characters for the product name`
          : `Maximum 200 characters for the product name.`
      ).message;
    }

    if (price < 0) {
      throw new Error(`Negative numbers are not allowed`);
    }

    return new Product(name, new Price(price), seller);
  }

  public publishedBy(): string {
    return this.seller;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price.getValue();
  }
}
