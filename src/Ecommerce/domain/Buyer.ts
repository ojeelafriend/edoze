import { uuid as uuidv4 } from 'uuidv4';

import { ShoppingCart } from './ShoppingCart';
import { Product } from './Product';

type typeBuyer = {
  uuid?: string;
  username: string;
  shoppingCart: ShoppingCart;
  password?: string;
  money?: number;
};
export class Buyer {
  private static MIN_CHAR_USERNAME: number = process.env.MIN_USERNAME ? parseInt(process.env.MIN_USERNAME) : 4;

  private static MAX_CHAR_USERNAME: number = process.env.MAX_USERNAME ? parseInt(process.env.MAX_USERNAME) : 14;

  private static MIN_CHAR_PASSWORD: number = process.env.MAX_PASSWORD ? parseInt(process.env.MAX_PASSWORD) : 6;

  private readonly uuid: string;
  private readonly username: string;
  private readonly password?: string;
  private shoppingCart: ShoppingCart;
  private money: number;

  public constructor({ uuid, username, shoppingCart, password, money }: typeBuyer) {
    this.uuid = uuid ? uuid : uuidv4();
    this.username = username;
    this.password = password;
    this.shoppingCart = shoppingCart;
    this.money = money ? money : 100;
  }

  public static create(username: string, password: string): Buyer {
    const containSpace: RegExp = /\s/;
    const checkString: RegExp = /^[a-zA-Z0-9]+$/;

    if (username.length >= this.MIN_CHAR_USERNAME) {
      throw new Error(`Username requires at least ${this.MIN_CHAR_USERNAME} characters`).message;
    }

    if (username.length > this.MAX_CHAR_USERNAME) {
      throw new Error(`Character range exceeded for username`).message;
    }

    if (containSpace.test(username)) {
      throw new Error(`This username can't contain characters with space`).message;
    }

    if (!checkString.test(username)) {
      throw new Error(`This username can't contain symbols`).message;
    }

    if (password.length < this.MIN_CHAR_PASSWORD) {
      throw new Error(`This password requires at least ${this.MIN_CHAR_PASSWORD} characters`);
    }

    return new Buyer({ username, shoppingCart: new ShoppingCart({ products: [] }), password });
  }

  public static persist(uuid: string, username: string, shoppingCart: ShoppingCart, money: number): Buyer {
    return new Buyer({ uuid, username, shoppingCart, money });
  }

  public getPersonalInfo(): { username: string; password: string; uuid: string } {
    return { username: this.username, password: this.password as string, uuid: this.uuid };
  }

  public getProductsFromCart(): string[] {
    return this.shoppingCart.getAllProducts();
  }

  public addCart(products: Product[]) {
    this.shoppingCart?.updateCart(products);
  }

  public removeAllFromCart() {
    this.shoppingCart?.updateCart([]);
  }

  public getMoney(): number {
    return this.money;
  }

  public pay(): number {
    const prices: any = this.shoppingCart?.getAmount();

    if (prices < this.money) {
      this.money = this.money - prices;
    }

    return this.money;
  }

  public canPay(): Boolean {
    const amount = this.shoppingCart?.getAmount() as number;

    return this.money >= amount ? true : false;
  }
}
