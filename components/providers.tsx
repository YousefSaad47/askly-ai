import { ClerkProvider } from '@clerk/nextjs';
import { NextUIProvider } from '@nextui-org/system';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClerkProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ClerkProvider>
    </>
  );
};
export default Providers;
