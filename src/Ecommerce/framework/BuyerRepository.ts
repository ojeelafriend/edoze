import { Buyer } from '../domain/Buyer';
import { IBuyerRepository } from '../domain/IBuyerRepository';

import buyerModel from './models/buyer';

export class BuyerRepository implements IBuyerRepository {
  // async listAll(): Promise<any> {
  //   const buyers = await buyerModel.find({ uuid: 1, username: 1, money: 1, shoppingCart: 1 });

  //   if (!buyers) {
  //     console.log(`Buyers is empty`);
  //     throw new Error(`Fail action, please try again later!`);
  //   }

  //   return buyers;
  // }

  async listById(uuid: string) {
    const buyerInfo = await buyerModel
      .findOne({ uuid }, { username: 1, shoppingCart: 1, money: 1, uuid: 1, password: 0, _id: 0, donate: 0 })
      .catch((err) => {
        console.log(`Buyer don't exists, check id: ${uuid}, more details: ${err}`);
        throw new Error(`Fail action, please try again later!`);
      });

    if (!buyerInfo) {
      console.log(`Buyer don't exists, check id: ${uuid}`);
      throw new Error(`Fail action, please try again later!`);
    }

    return {
      uuid: buyerInfo.uuid as string,
      username: buyerInfo.username as string,
      productsIdFromCart: buyerInfo.shoppingCart as any[],
      money: buyerInfo.money as number,
    };
  }
  async create(buyer: Buyer): Promise<void> {
    const { uuid, username, password } = buyer.getPersonalInfo();
    const money = buyer.getMoney();

    const newBuyer = new buyerModel({
      uuid,
      username,
      password,
      money,
      shoppingCart: buyer.getProductsFromCart(),
    });

    await newBuyer.save().catch((err) => {
      console.log(`Fail from create new buyer, called "${buyer.getPersonalInfo().username}" more details: ${err}`);
      throw new Error(`Fail create account: ${buyer.getPersonalInfo().username}, please try again later!`);
    });
  }

  async updateCart(buyer: Buyer): Promise<void> {
    await buyerModel
      .updateOne({ uuid: buyer.getPersonalInfo().uuid }, { shoppingCart: buyer.getProductsFromCart() })
      .catch((err) => {
        console.log(`Fail from update new buyer, ${buyer.getProductsFromCart()} more details: ${err}`);
        throw new Error(`Fail edit shopping cart ${buyer.getPersonalInfo().username}, please try again later!`);
      });
  }
}
