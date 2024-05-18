import { Buyer } from '../domain/Buyer';
import { Product } from '../domain/Product';
import { IBuyerRepository } from '../domain/IBuyerRepository';

import { listProductById } from './product';

import { ProductRepository } from '../framework/ProductRepository';
import { ShoppingCart } from '../domain/ShoppingCart';

const productRepository = new ProductRepository();

export const createBuyer = async (repository: IBuyerRepository, username: string, password: string): Promise<Buyer> => {
  const buyer = Buyer.create(username, password);
  await repository.create(buyer);

  return buyer;
};

export const editShoppingCart = async (repository: IBuyerRepository, uuid: string, productsIdFromCart: string[]) => {
  let products: Product[] = [];

  //traigo por el id los id de los productos.
  const { username, money } = await repository.listById(uuid);

  //itero los id de los productos y traigo los productos de la base de datos.
  for (const id of productsIdFromCart) {
    const product = await listProductById(productRepository, id);

    //creo un arreglo con cada producto del carrito.
    products = [...products, product];
  }

  //creo un shopping cart ?
  const shoppingCart = new ShoppingCart({ products });

  //persisto el Buyer con su shoppingCart
  const buyer = Buyer.persist(uuid, username, shoppingCart, money);

  //actualizo ?
  await repository.updateCart(buyer);

  let productInfo = [{}];

  for (const product of products) {
    productInfo = [
      ...productInfo,
      { uuid: product.getId(), name: product.getName(), price: product.getPrice(), seller: product.publishedBy() },
    ];
  }

  return { uuid, username, money, shoppingCart: { canPay: buyer.canPay(), products: productInfo } };
};
