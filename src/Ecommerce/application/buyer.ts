import jwt from "jsonwebtoken";

import { Buyer } from "../domain/Buyer";
import { Product } from "../domain/Product";
import { IBuyerRepository } from "../domain/IBuyerRepository";

import { listProductById } from "./product";

import { ProductRepository } from "../framework/ProductRepository";
import { EncryptorBcrypt } from "../framework/EncryptorBcrypt";

import { ShoppingCart } from "../domain/ShoppingCart";
import buyer from "../framework/models/buyer";

const productRepository = new ProductRepository();
const encryptor = new EncryptorBcrypt();

export const login = async (
  repository: IBuyerRepository,
  username: string,
  password: string
) => {
  const user = await repository.listByUsername(username);

  if (!user) {
    console.log(`USER: ${user}`);
    throw new Error(`Username or password incorrect`);
  }

  if (!(await encryptor.isEquals({ password, hash: user.password }))) {
    console.log(`Password invalidate, check this...`);
    throw new Error(`Username or password incorrect`);
  }

  const token = jwt.sign(
    { uuid: user.uuid, username: user.username },
    process.env.SECRET_JWT_KEY as string
  );

  let products: any = [];

  for (const productId of user.productsIdFromCart) {
    const product = await productRepository.findById(productId);

    products = [...products, product];
  }

  const shoppingCart = new ShoppingCart({ products });

  const buyer = Buyer.persist(
    user.uuid,
    user.username,
    shoppingCart,
    user.money
  );

  return {
    uuid: buyer.getPersonalInfo().uuid,
    username,
    money: buyer.getMoney(),
    shoppingCart: { canPay: buyer.canPay(), products },
    token,
  };
};

export const createBuyer = async (
  repository: IBuyerRepository,
  username: string,
  password: string
): Promise<Buyer> => {
  const hash = await encryptor.encrypt(password);

  const buyer = Buyer.create(username, hash);
  await repository.create(buyer);

  return buyer;
};

export const editShoppingCart = async (
  repository: IBuyerRepository,
  uuid: string,
  productsIdFromCart: string[]
) => {
  let products: Product[] = [];

  const { username, money } = await repository.listById(uuid);

  for (const id of productsIdFromCart) {
    const product = await listProductById(productRepository, id);

    products = [...products, product];
  }

  const shoppingCart = new ShoppingCart({ products });

  const buyer = Buyer.persist(uuid, username, shoppingCart, money);

  await repository.updateCart(buyer);

  let productInfo: any = [];

  for (const product of products) {
    productInfo = [
      ...productInfo,
      {
        uuid: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        seller: product.publishedBy(),
      },
    ];
  }
  console.log(productInfo);
  return {
    uuid,
    username,
    money,
    shoppingCart: { canPay: buyer.canPay(), products: productInfo },
  };
};
