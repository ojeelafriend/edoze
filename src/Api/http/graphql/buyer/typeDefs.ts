import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Product {
    uuid: String!
    name: String!
    price: Float!
    seller: String #este valor no deberia de ser obligatorio devolver
  }

  type ShoppingCart {
    canPay: Boolean
    products: [Product!]!
  }

  type Buyer {
    uuid: String!
    username: String!
    money: Int
    shoppingCart: ShoppingCart
    token: String
  }

  type Query {
    buyers: [Buyer!]!
    buyer(uuid: ID!): Buyer
  }

  type Mutation {
    createAccount(username: String!, password: String!): Buyer
    editShoppingCart(uuid: ID!, products: [String]): Buyer
  }
`;

// login(username: String!, password: String!): Buyer
