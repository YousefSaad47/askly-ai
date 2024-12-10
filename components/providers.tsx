import { ClerkProvider } from '@clerk/nextjs';
import { NextUIProvider } from '@nextui-org/system';
import ApolloProviderWrapper from './ApolloProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClerkProvider>
        <ApolloProviderWrapper>
          <NextUIProvider>{children}</NextUIProvider>
        </ApolloProviderWrapper>
      </ClerkProvider>
    </>
  );
};
export default Providers;
