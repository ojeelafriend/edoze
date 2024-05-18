export const typeDefs = `
  type Product {
    uuid: String!
    name: String!
    price: Float!
    seller: String #este valor no deberia de ser obligatorio devolver
  }

  type Seller {
    name: String!
    products: [Product!]!
  }

  type Query {
    products: [Product]
    product(uuid: ID!): Product
    sellers: [Seller]
    seller(username: String!): Seller
  }

  type Mutation {
    createProduct(name: String!, price: Float!, seller: String!): Product
    editProduct(uuid: ID!, name: String!, price: String!): Product
    removeProduct(uuid: ID!): Product
  }
`;
