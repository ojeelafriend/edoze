export class Price {
  private readonly price: number;

  private readonly currency: "EUR" | "USD" | "GBP";

  public constructor(price: number) {
    this.currency = process.env.DEFAULT_CURRENCY as "EUR" | "USD" | "GBP";
    this.price = parseFloat(price.toFixed(2));
  }

  public getValue(): number {
    return this.price;
  }

  public getCurrencyCode(): "EUR" | "USD" | "GBP" {
    return this.currency;
  }
}
