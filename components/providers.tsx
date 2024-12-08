import { ClerkProvider } from '@clerk/nextjs';
import { NextUIProvider } from '@nextui-org/system';
import ApolloProviderWrapper from './ApolloProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ApolloProviderWrapper>
        <ClerkProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </ClerkProvider>
      </ApolloProviderWrapper>
    </>
  );
};
export default Providers;
