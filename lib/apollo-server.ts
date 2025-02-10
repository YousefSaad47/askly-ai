import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const createServerClient = (authToken: string) => {
  const uri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/graphql'
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`;

  const httpLink = createHttpLink({ uri });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${authToken}`,
    },
  }));

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  return new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions,
  });
};
