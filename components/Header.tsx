import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@nextui-org/button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm text-gray-800 flex justify-between items-center p-5 z-10">
      <Link href="/" className="flex gap-4 items-center">
        <Image src="/logo.png" alt="logo" width={60} height={60} />
        <h1 className="text-xs lg:text-sm">Your Customisable AI Agent</h1>
      </Link>

      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <Button radius="sm">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </header>
  );
};
export default Header;
