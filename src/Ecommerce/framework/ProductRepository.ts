import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";

import productModel from "./models/product";

export class ProductRepository implements IProductRepository {
  async create(product: Product): Promise<void> {
    await new productModel({
      uuid: product.getId(),
      name: product.getName(),
      price: product.getPrice(),
      seller: product.publishedBy(),
    }).save();
  }

  async findById(uuid: string): Promise<Product> {
    const product = await productModel.findOne({ uuid });

    if (!product) {
      throw new Error(`${uuid} don't exists in database`).message;
    }

    return Product.create({
      uuid: product.uuid as string,
      name: product.name as string,
      price: product.price as number,
      seller: product.seller as string,
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await productModel.find();

    if (!products) {
      throw new Error(`Products don't exists in database`).message;
    }

    let arrayProduct: Product[] = [];

    for (const product of products) {
      arrayProduct = [
        ...arrayProduct,
        Product.create({
          uuid: product.uuid as string,
          name: product.name as string,
          price: product.price as number,
          seller: product.seller as string,
        }),
      ];
    }

    return arrayProduct;
  }

  async update(product: Product): Promise<void> {
    await productModel
      .updateOne(
        { uuid: product.getId() },
        {
          name: product.getName(),
          price: product.getPrice(),
          seller: product.publishedBy(),
        }
      )
      .catch((err) => {
        console.log(
          `Fail edit ${product.getName()}, uuid: ${product.getId()}: more details... \n ${err}`
        );
        throw new Error(`Fail edit ${product.getName()}, please try later!`);
      });
  }

  async delete(uuid: string): Promise<void> {
    await productModel.deleteOne({ uuid }).catch((err) => {
      console.log(`Fail remove ${uuid}: more details... \n ${err}`);
      throw new Error(`Fail remove ${uuid}, please try later!`);
    });
  }
}
