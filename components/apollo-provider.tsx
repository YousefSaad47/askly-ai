'use client';

import { ApolloProvider } from '@apollo/client';
import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from '@clerk/nextjs';
import { useMemo } from 'react';

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

export const ApolloProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { getToken } = useAuth();

  const apolloClient = useMemo(() => {
    const authMiddleware = setContext(async (operation, { headers }) => {
      const token = await getToken();

      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
      defaultOptions,
    });
  }, [getToken]);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
