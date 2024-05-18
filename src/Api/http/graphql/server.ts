import { ApolloServer } from '@apollo/server';

import { typeDefs as tdProduct } from './product/typeDefs';
import { resolvers as rsProduct } from './product/resolvers';
import { typeDefs as tdBuyer } from './buyer/typeDefs';
import { resolvers as rsBuyer } from './buyer/resolvers';

const graphqlServer = new ApolloServer({
  typeDefs: [tdProduct, tdBuyer],
  resolvers: [rsProduct, rsBuyer],
});

export default graphqlServer;
