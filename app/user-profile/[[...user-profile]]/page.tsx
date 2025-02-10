import { UserProfile, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { Button } from '@heroui/button';
import { Skeleton } from '@heroui/skeleton';
import { Card } from '@heroui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ProfileSkeleton = () => {
  return (
    <ClerkLoading>
      <Card
        className="w-[350px] h-[704px] md:w-[880px] space-y-5 p-4"
        radius="lg"
      >
        <Skeleton className="rounded-lg">
          <div className="h-16 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-5 w-1/2 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-5 w-full rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-1/3 rounded-lg">
            <div className="h-5 w-1/3 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-5 w-full rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-5 w-1/2 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    </ClerkLoading>
  );
};

const UserProfilePage = () => {
  return (
    <div className="flex mt-10 flex-col gap-4 items-center min-h-screen">
      <Button
        as={Link}
        href="/"
        size="lg"
        className="group inline-flex items-center space-x-2"
      >
        <ArrowRight className="size-5 rotate-180 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
        <span>Back</span>
      </Button>

      <ProfileSkeleton />

      <div className="flex-1">
        <ClerkLoaded>
          <UserProfile />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default UserProfilePage;
