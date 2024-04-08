import { Product } from "./Product";

export interface IProductRepository {
  create(product: Product): Promise<void>;
  findById(uuid: string): Promise<Product>;
  findAll(): Promise<Product[]>;
  update(uuid: string, product: Product): Promise<void>;
  delete(uuid: string): Promise<void>;
}
