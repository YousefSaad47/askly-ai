'use client';

import React, { useEffect, useState } from 'react';
import { BotMessageSquare, PencilLine, SearchIcon } from 'lucide-react';
import { Tabs, Tab } from '@heroui/tabs';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const sidebarItems = [
  {
    href: '/create-chatbot',
    icon: <BotMessageSquare className="size-5 md:size-7" />,
    title: 'Create new chatbot',
  },
  {
    href: '/view-chatbots',
    icon: <PencilLine className="size-5 float-start md:size-7" />,
    title: 'Edit chatbot',
  },
  {
    href: '/review-sessions',
    icon: <SearchIcon className="size-5 md:size-7" />,
    title: 'View sessions',
  },
];

const Sidebar = () => {
  const [isVertical, setIsVertical] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVertical(window.innerWidth >= 768);
    setMounted(true);
    const handleResize = () => {
      setIsVertical(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <aside className="bg-white dark:bg-black text-white p-5 relative border-r border-r-default-200 dark:border-r-default-100">
      <Tabs
        aria-label="Sidebar"
        variant="bordered"
        size="lg"
        color={theme === 'dark' ? 'secondary' : 'default'}
        fullWidth
        isVertical={isVertical}
      >
        {sidebarItems.map((item, index) => (
          <Tab
            key={`${item.href}-${index}`}
            title={
              <Link
                href={item.href}
                className="flex items-center gap-1 text-black dark:text-white"
              >
                {item.icon}
                <p className="text-xs md:text-sm">{item.title}</p>
              </Link>
            }
          />
        ))}
      </Tabs>
    </aside>
  );
};

export default Sidebar;
