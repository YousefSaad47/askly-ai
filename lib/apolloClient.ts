import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/graphql'
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`;

const httpLink = createHttpLink({
  uri,
});

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

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default apolloClient;
