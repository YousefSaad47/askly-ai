'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar';
import { Breadcrumbs, BreadcrumbItem } from '@heroui/breadcrumbs';
import { Link } from '@heroui/link';
import { useClerk } from '@clerk/nextjs';
import { useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Logo } from './Logo';
import { UserAvatar } from './UserAvatar';

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
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link className="w-full" color={'foreground'} href={item.href}>
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          {user && (
            <NavbarMenuItem>
              <Link href="/" color={'danger'} onPress={() => signOut()}>
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
