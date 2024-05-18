export const typeDefs = `
type Product {
    uuid: String!
    name: String!
    price: Float!
    seller: String #este valor no deberia de ser obligatorio devolver
  }

  type Buyer {
    uuid: String!
    username: String!
    money: Int
    shoppingCart: {
        canPay: Boolean
        products: [Product!]!
    }
  }

  type Query {
    buyers: [Buyer!]!
    buyer(uuid: ID!) : Buyer
  }

  type Mutation {
    createAccount(username: String!, password: String!): Buyer
    editShoppingCart(uuid: ID!, products: [String] ): Buyer
  }
`;
