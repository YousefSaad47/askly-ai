'use client';

import { HeroUIProvider } from '@heroui/system';
import { ApolloProviderWrapper } from './apollo-provider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClerkProvider>
        <ApolloProviderWrapper>
          <HeroUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              {children}
              <Toaster position="bottom-center" />
            </NextThemesProvider>
          </HeroUIProvider>
        </ApolloProviderWrapper>
      </ClerkProvider>
    </>
  );
};
export default Providers;
