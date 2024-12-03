import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Avatar from '@/components/Avatar';

const Header = () => {
  return (
    <header className="bg-white shadow-sm text-gray-800 flex justify-between items-center p-5">
      <Link href="/" className="flex items-center text-4xl font-thin">
        <Avatar seed="Askly AI Support Chat Agent" />
        <div className="space-y-1">
          <h1>Askly</h1>
          <h2 className="text-sm">Your Customisable AI Agent</h2>
        </div>
      </Link>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </header>
  );
};
export default Header;
