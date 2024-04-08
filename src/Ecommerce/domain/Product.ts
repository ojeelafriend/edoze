import { uuid as uuidv4 } from "uuidv4";

import { Price } from "./Price";

export class Product {
  private readonly uuid: string;
  private readonly name: string;
  private readonly seller: string;
  private readonly price: Price;

  public constructor(uuid: string, name: string, price: Price, seller: string) {
    this.uuid = uuid;
    this.name = name;
    this.price = price;
    this.seller = seller;
  }

  public static create({
    uuid,
    name,
    price,
    seller,
  }: {
    uuid?: string;
    name: string;
    price: number;
    seller: string;
  }): Product {
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

    return new Product(!uuid ? uuidv4() : uuid, name, new Price(price), seller);
  }

  public getId(): string {
    return this.uuid;
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
