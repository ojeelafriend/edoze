import { createBuyer, editShoppingCart } from '../../../../Ecommerce/application/buyer';
import { BuyerRepository } from '../../../../Ecommerce/framework/BuyerRepository';

import buyerModel from '../../../../Ecommerce/framework/models/buyer';
import productModel from '../../../../Ecommerce/framework/models/product';

const repository = new BuyerRepository();

export const resolvers = {
  Query: {
    buyers: async (_: any) => {
      let buyers = [{}];

      const buyersDb = await buyerModel.find({
        _id: 0,
        donate: 0,
        password: 0,
        uuid: 1,
        username: 1,
        money: 1,
        shoppingCart: 1,
      });

      for (const buyer of buyersDb) {
        let products: any = [];
        buyer.shoppingCart.map(async (productId) => {
          const product = await productModel.findOne({ uuid: productId });
          products = [...products, product];
        });

        const amount: number = products.reduce((acc, product) => product.money + acc, 0);

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

    buyer: async (_: any, uuid: string) => {
      let buyer = {};
      let products: any = [];
      const buyerDb = await buyerModel.findOne(
        { uuid },
        { _id: 0, donate: 0, password: 0, uuid: 1, username: 1, money: 1, shoppingCart: 1 }
      );

      buyerDb?.shoppingCart.map(async ({ productId }) => {
        const product = await productModel.findOne({ uuid: productId });
        products = [...products, product];
      });

      const amount: number = products.reduce((acc, product) => product.money + acc, 0);

      const result = (buyerDb?.money as number) - amount;

      buyer = {
        uuid: buyerDb?.uuid,
        username: buyerDb?.username,
        money: buyerDb?.money,
        shoppingCart: {
          canPay: result >= 0,
          products,
        },
      };
    },
  },

  Mutation: {
    createAccount: async (_: any, username: string, password: string) => {
      const buyer = await createBuyer(repository, username, password);

      const { uuid } = buyer.getPersonalInfo();

      return {
        uuid,
        username,
        money: buyer.getMoney(),
        shoppingCart: { canPay: false, products: [] },
      };
    },

    editShoppingCart: async (_: any, uuid: string, products: string[]) => {
      return await editShoppingCart(repository, uuid, products);
    },
  },
};
