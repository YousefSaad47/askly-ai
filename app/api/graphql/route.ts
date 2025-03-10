import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import depthLimit from 'graphql-depth-limit';

import { NextRequest } from 'next/server';
import { typeDefs } from '@/graphql/graphql-schema';
import { resolvers } from '@/graphql/resolvers';
import { prisma } from '@/lib/prisma';
import { Context } from '@/graphql/types';

type RouteHandler = (req: NextRequest) => Promise<Response>;

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5)],

  formatError: (err) => {
    console.error(err);
    return new Error('Internal server error');
  },
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => ({ req, prisma }),
}) as RouteHandler;

export { handler as GET, handler as POST };
