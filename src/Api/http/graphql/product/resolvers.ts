import {
  createProduct,
  editProduct,
  listAllProduct,
  listProductById,
  removeProduct,
} from '../../../../Ecommerce/application/product';

import { ProductRepository } from '../../../../Ecommerce/framework/ProductRepository';

const repository = new ProductRepository();

export const resolvers = {
  Query: {
    products: async () => {
      const products = await listAllProduct(repository);
      let wrapper: any = [];

      for (const product of products) {
        wrapper = [
          ...wrapper,
          {
            uuid: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
            seller: product.publishedBy(),
          },
        ];
      }

      return wrapper;
    },

    product: async (_: any, { uuid }: any) => {
      const product = await listProductById(repository, uuid);
      return {
        uuid: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        seller: product.publishedBy(),
      };
    },

    sellers: async () => {
      const products = (await listAllProduct(repository)).map((product) => {
        return {
          uuid: product.getId(),
          name: product.getName(),
          price: product.getPrice(),
          seller: product.publishedBy(),
        };
      });

      const sellers = Array.from(new Set(products.map((product) => product.seller)));

      const wrapper = sellers.map((seller) => {
        return { name: seller, products: products.filter((product) => product.seller === seller) };
      });

      return wrapper;
    },

    seller: async (_: any, { username }: any) => {
      const products = (await listAllProduct(repository)).map((product) => {
        return {
          uuid: product.getId(),
          name: product.getName(),
          price: product.getPrice(),
          seller: product.publishedBy(),
        };
      });

      return { name: username, products: products.filter((product) => product.seller === username) };
    },
  },

  Mutation: {
    createProduct: async (_: any, args: any) => {
      const { name, price, seller } = args;

      const product = await createProduct(repository, name, price, seller);

      return {
        uuid: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        seller: product.publishedBy(),
      };
    },

    editProduct: async (_: any, args: any) => {
      const { uuid, name, price } = args;
      const seller = (await listProductById(repository, uuid)).publishedBy();

      const product = await editProduct(repository, uuid, name, price, seller);

      return {
        uuid: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        seller: product.publishedBy(),
      };
    },

    removeProduct: async (_: any, args: any) => {
      const product = await listProductById(repository, args.uuid);

      if (product) {
        await removeProduct(repository, args.uuid);
      }

      return {
        uuid: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        seller: product.publishedBy(),
      };
    },
  },
};
