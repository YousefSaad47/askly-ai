'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const SunIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="22"
    role="presentation"
    viewBox="0 0 24 24"
    width="22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
      stroke="currentColor"
      strokeWidth="1.5"
    ></path>
    <path
      d="M12 2V4M12 20V22M4 12H2M22 12H20M19.778 4.223L17.556 6.254M4.222 4.223L6.444 6.254M6.444 17.556L4.222 19.778M19.778 19.777L17.556 17.555"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    ></path>
  </svg>
);

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="22"
    role="presentation"
    viewBox="0 0 24 24"
    width="22"
  >
    <path
      d="M21.25 12C21.25 14.4533 20.2754 16.806 18.5407 18.5407C16.806 20.2754 14.4533 21.25 12 21.25V22.75C17.937 22.75 22.75 17.937 22.75 12H21.25ZM12 21.25C9.54675 21.25 7.19397 20.2754 5.45926 18.5407C3.72455 16.806 2.75 14.4533 2.75 12H1.25C1.25 17.937 6.063 22.75 12 22.75V21.25ZM2.75 12C2.75 9.54675 3.72455 7.19397 5.45926 5.45926C7.19397 3.72455 9.54675 2.75 12 2.75V1.25C6.063 1.25 1.25 6.063 1.25 12H2.75ZM15.5 14.25C13.975 14.25 12.5125 13.6442 11.4341 12.5659C10.3558 11.4875 9.75 10.025 9.75 8.5H8.25C8.25 10.4228 9.01384 12.2669 10.3735 13.6265C11.7331 14.9862 13.5772 15.75 15.5 15.75V14.25ZM20.425 11.469C19.9133 12.3176 19.191 13.0197 18.3281 13.5069C17.4652 13.9942 16.491 14.2501 15.5 14.25V15.75C16.7494 15.7504 17.9777 15.4279 19.0657 14.8138C20.1537 14.1997 21.0646 13.3148 21.71 12.245L20.425 11.469ZM9.75 8.5C9.74986 7.50903 10.0058 6.53483 10.4931 5.67193C10.9803 4.80902 11.6824 4.08669 12.531 3.575L11.755 2.291C10.6854 2.93628 9.80058 3.84701 9.18649 4.93486C8.57239 6.02271 8.2498 7.25078 8.25 8.5H9.75ZM12 2.75C11.9497 2.74903 11.9002 2.73811 11.8542 2.71785C11.8082 2.6976 11.7666 2.66842 11.732 2.632C11.6898 2.58965 11.6613 2.53568 11.65 2.477C11.646 2.446 11.648 2.356 11.755 2.291L12.531 3.575C13.034 3.271 13.196 2.714 13.137 2.276C13.075 1.821 12.717 1.25 12 1.25V2.75ZM21.71 12.245C21.644 12.352 21.554 12.354 21.523 12.35C21.4643 12.3387 21.4103 12.3102 21.368 12.268C21.3316 12.2334 21.3024 12.1918 21.2821 12.1458C21.2619 12.0998 21.251 12.0503 21.25 12H22.75C22.75 11.283 22.179 10.925 21.724 10.863C21.286 10.804 20.729 10.966 20.425 11.469L21.71 12.245Z"
      fill="currentColor"
    ></path>
  </svg>
);

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <li className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold sm:flex gap-2">
      <label
        aria-label="Switch to {theme === 'dark' ? 'light' : 'dark'} mode"
        className="group relative max-w-fit touch-none tap-highlight-transparent select-none p-1 w-8 transition-opacity hover:opacity-80 cursor-pointer border-1 border-default-200 rounded-full h-full min-w-10 min-h-10 flex items-center justify-center"
        data-selected={theme === 'dark' ? 'true' : 'false'}
      >
        <div
          style={{
            border: 0,
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: '1px',
            margin: '-1px',
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            width: '1px',
            whiteSpace: 'nowrap',
          }}
        >
          <input
            aria-labelledby="switch-theme-input"
            type="checkbox"
            role="switch"
            className="[--cursor-hit-x:8px] font-inherit text-[100%] leading-[1.15] m-0 p-0 overflow-visible box-border absolute top-0 start-[calc(var(--cursor-hit-x)*-1)] w-[calc(100%+var(--cursor-hit-x)*2)] h-full opacity-[0.0001] z-[1] cursor-pointer disabled:cursor-default"
            checked={theme === 'dark'}
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            value=""
          />
        </div>
        <div
          aria-hidden="true"
          className="relative flex-shrink-0 overflow-hidden outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background group-data-[selected=true]:text-primary-foreground transition-background w-auto h-auto bg-transparent rounded-lg flex items-center justify-center group-data-[selected=true]:bg-transparent pt-0 px-0 mx-0 !text-default-400 dark:!text-default-500"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </div>
      </label>
    </li>
  );
}
