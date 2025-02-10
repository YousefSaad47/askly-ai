'use client';

import { useEffect, useState } from 'react';
import { BotMessageSquare, PencilLine, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    href: '/create-chatbot',
    icon: <BotMessageSquare className="size-5 lg:size-7" />,
    title: 'Create new chatbot',
  },
  {
    href: '/view-chatbots',
    icon: <PencilLine className="size-5 lg:size-7" />,
    title: 'Edit chatbot',
  },
  {
    href: '/review-sessions',
    icon: <SearchIcon className="size-5 lg:size-7" />,
    title: 'View sessions',
  },
];

const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="flex flex-row gap-2 p-6">
        <div className="w-48 h-10 rounded-xl bg-transparent border border-default" />
        <div className="w-48 h-10 rounded-xl bg-transparent border border-default" />
        <div className="w-48 h-10 rounded-xl bg-transparent border border-default" />
      </div>
    );

  return (
    <aside className="bg-white dark:bg-black p-5 border-r border-r-default-200 dark:border-r-default-100">
      <nav className="flex flex-row lg:flex-col items-center lg:items-start space-x-2 lg:space-x-0 space-y-0 lg:space-y-2">
        {sidebarItems.map((item, index) => (
          <Link
            key={`${item.href}-${index}`}
            href={item.href}
            className={cn(
              'flex items-center text-center justify-start gap-3',
              'p-2 w-48 h-10 rounded-xl border border-default',
              'transition-colors duration-200 group',
              pathname === item.href
                ? 'bg-secondary text-white'
                : 'text-gray-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800'
            )}
          >
            <span
              className={cn(
                'text-current',
                pathname === item.href
                  ? 'text-white'
                  : 'group-hover:text-secondary dark:group-hover:text-secondary'
              )}
            >
              {item.icon}
            </span>
            <span className="text-xs lg:text-sm">{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
