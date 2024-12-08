import {
  ApolloClient,
  DefaultOptions,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

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

export const serverClient = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `ApiKey ${process.env.GRAPHQL_TOKEN}`,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions,
});
