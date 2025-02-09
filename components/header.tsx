'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar';
import Link from 'next/link';
import { useClerk } from '@clerk/nextjs';
import { useState } from 'react';
import { ThemeSwitcher } from './theme-switcher';
import { Logo } from './logo';
import { UserAvatar } from './user-avatar';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Profile', href: '/user-profile' },
  { name: 'Create New Chatbot', href: '/create-chatbot' },
  { name: 'Edit Chatbot', href: '/view-chatbots' },
  { name: 'View Sessions', href: '/review-sessions' },
];

const AppLogo = () => (
  <Link href="/" className="flex gap-4 items-center">
    <Logo />
    <p className="text-2xl font-medium text-foreground">AsklyAI</p>
  </Link>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, signOut } = useClerk();

  return (
    <>
      <Navbar
        shouldHideOnScroll
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="z-[9999]"
      >
        <NavbarBrand>
          <AppLogo />
        </NavbarBrand>
        <NavbarContent justify="end">
          <ThemeSwitcher />
        </NavbarContent>
        {user && (
          <NavbarContent className="hidden sm:flex" justify="center">
            <UserAvatar />
          </NavbarContent>
        )}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              className={cn(index === 0 && 'mt-2')}
              key={`${item.href}-${index}`}
            >
              <Link className="w-full" color={'foreground'} href={item.href}>
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          {user && (
            <NavbarMenuItem>
              <Link href="/" className="text-danger" onClick={() => signOut()}>
                Sign Out
              </Link>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default Header;
