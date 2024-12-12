import { ClerkProvider } from '@clerk/nextjs';
import { NextUIProvider } from '@nextui-org/system';
import ApolloProviderWrapper from './ApolloProvider';
import { Toaster } from '@/components/ui/sonner';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClerkProvider>
        <ApolloProviderWrapper>
          <NextUIProvider>
            {children}
            <Toaster position="bottom-center" />
          </NextUIProvider>
        </ApolloProviderWrapper>
      </ClerkProvider>
    </>
  );
};
export default Providers;
