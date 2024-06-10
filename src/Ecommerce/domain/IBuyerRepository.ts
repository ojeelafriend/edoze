import { Buyer } from "./Buyer";

export interface IBuyerRepository {
  create(buyer: Buyer): Promise<void>;
  updateCart(buyer: Buyer): Promise<void>;
  listById(uuid: string): Promise<{
    uuid: string;
    username: string;
    productsIdFromCart: any[];
    money: number;
  }>;
  listByUsername(username: string): Promise<{
    uuid: string;
    username: string;
    productsIdFromCart: any[];
    money: number;
    password: string;
  }>;
}
