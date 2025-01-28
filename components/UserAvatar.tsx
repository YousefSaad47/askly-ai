'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown';
import { User } from '@heroui/user';

import { useClerk } from '@clerk/nextjs';
import Link from 'next/link';

export const UserAvatar = () => {
  const { signOut, user } = useClerk();
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user?.imageUrl,
            }}
            className="transition-transform"
            description={user?.username ? `@${user.username}` : ''}
            name={user?.fullName}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          {user?.username ? (
            <DropdownItem key="user" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold text-primary">@{user?.username}</p>
            </DropdownItem>
          ) : null}
          <DropdownItem key="profile">
            <Link href="/user-profile">Profile</Link>
          </DropdownItem>
          <DropdownItem key="logout" onPress={() => signOut()}>
            <p className="text-danger">Sign Out</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
