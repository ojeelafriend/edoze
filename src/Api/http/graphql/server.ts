import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import jwt from 'jsonwebtoken';

import { BuyerRepository } from '../../../Ecommerce/framework/BuyerRepository';
import { typeDefs, resolvers } from './schema';

const repository = new BuyerRepository();

interface UserInterface {
  uuid: string;
  username: string;
}

interface MyContext {
  user: UserInterface;
}

export async function startApolloServer() {
  const graphqlServer = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    introspection: true,
  });

  const { url } = await startStandaloneServer(graphqlServer, {
    context: async ({ req, res }) => {
      const token = req.headers.authorization || '';
      try {
        const payload: any = jwt.verify(token, process.env.SECRET_JWT_KEY as string);

        //drop clg
        console.log(`este es el uuid ${payload.uuid}`);

        const user = await repository.listById(payload.uuid);

        return {
          user: {
            username: user?.username || 'client',
            uuid: user?.uuid || '',
          },
        };
      } catch (err: any) {
        let obj;
        if (token === process.env.API_KEY) {
          obj = { user: { username: 'client', uuid: '' } };
        }

        return obj;
      }
    },
  });

  return url;
}
