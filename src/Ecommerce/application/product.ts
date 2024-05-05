import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";

export const createProduct = async (
  repository: IProductRepository,
  name: string,
  price: number,
  seller: string
): Promise<Product> => {
  const product = Product.create({ name, price, seller });
  await repository.create(product);
  return product;
};

export const listProductById = async (
  repository: IProductRepository,
  uuid: string
): Promise<Product> => {
  return await repository.findById(uuid);
};

export const listAllProduct = async (
  repository: IProductRepository
): Promise<Product[]> => {
  return await repository.findAll();
};

export const editProduct = async (
  repository: IProductRepository,
  uuid: string,
  name: string,
  price: number,
  seller: string
): Promise<Product> => {
  const product = Product.create({ uuid, name, price, seller });
  await repository.update(product);

  return product;
};

export const removeProduct = async (
  repository: IProductRepository,
  uuid: string
): Promise<void> => {
  await repository.delete(uuid);
};
