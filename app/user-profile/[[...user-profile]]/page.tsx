import { UserProfile, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { Button } from '@heroui/button';
import { Skeleton } from '@heroui/skeleton';
import { Card } from '@heroui/card';
import Link from 'next/link';

const ProfileSkeleton = () => {
  return (
    <ClerkLoading>
      <Card
        className="w-[468px] h-[704px] md:w-[880px] space-y-5 p-4"
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
        className="w-[468px] md:w-[880px]"
        as={Link}
        href="/"
        variant="bordered"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          className="text-xl rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z"></path>
        </svg>
        Back
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
