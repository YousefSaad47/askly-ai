import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

const uri = '/api/graphql';

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
