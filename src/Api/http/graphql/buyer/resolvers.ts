import { createBuyer, editShoppingCart, login } from '../../../../Ecommerce/application/buyer';
import { BuyerRepository } from '../../../../Ecommerce/framework/BuyerRepository';

import buyerModel from '../../../../Ecommerce/framework/models/buyer';
import productModel from '../../../../Ecommerce/framework/models/product';
import jwt from 'jsonwebtoken';

const repository = new BuyerRepository();

export const resolvers = {
  Query: {
    buyers: async (_: any) => {
      let buyers: any = [];
      const buyersDb = await buyerModel.find();

      for (const buyer of buyersDb) {
        let products: any = [];

        //accedo al shopping cart de cada buyer.
        for (const productId of buyer.shoppingCart) {
          const product = await productModel.findOne({ uuid: productId });
          products = [...products, product];
        }

        //accedo al amount total de cada producto en el shoppingCart de cada buyer.
        const amount: number = products.reduce((acc: any, product: any) => {
          return acc + product?.price;
        }, 0);

        const result = (buyer.money as number) - amount;

        buyers = [
          ...buyers,
          {
            uuid: buyer.uuid,
            username: buyer.username,
            money: buyer.money,
            shoppingCart: {
              canPay: result >= 0,
              products,
            },
          },
        ];
      }

      return buyers;
    },

    buyer: async (_: any, { uuid }: { uuid: string }) => {
      let buyer = {};
      let products: any = [];

      const buyerDb = await buyerModel.findOne({ uuid });
      if (!buyerDb?.shoppingCart) {
        throw new Error(`ShoppingCart is void`);
      }

      for (const productId of buyerDb?.shoppingCart) {
        const product = await productModel.findOne({ uuid: productId });
        products = [...products, product];
      }

      const amount: number = products.reduce((acc: any, product: any) => {
        return acc + product.price;
      }, 0);

      const result = (buyerDb?.money as number) - amount;

      return (buyer = {
        uuid: buyerDb?.uuid,
        username: buyerDb?.username,
        money: buyerDb?.money,
        shoppingCart: {
          canPay: result >= 0,
          products,
        },
      });
    },
  },

  Mutation: {
    createAccount: async (_: any, { username, password }: { username: string; password: string }) => {
      const buyer = await createBuyer(repository, username, password);

      const { uuid } = buyer.getPersonalInfo();

      const token = jwt.sign({ uuid, username }, process.env.SECRET_JWT_KEY as string);

      return {
        uuid,
        username,
        money: buyer.getMoney(),
        shoppingCart: { canPay: false, products: [] },
        token,
      };
    },

    editShoppingCart: async (_: any, { uuid, products }: { uuid: string; products: string[] }) => {
      return await editShoppingCart(repository, uuid, products);
    },
  },
};
