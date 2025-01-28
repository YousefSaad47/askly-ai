'use client';

import { useEffect, useRef, useState } from 'react';

export const Logo = ({
  width = 50,
  height = 50,
}: {
  width?: number;
  height?: number;
}) => {
  const [pathD, setPathD] = useState(
    'M98.3318 190.694C-10.6597 291.485 121.25 273.498 148.233 295'
  );

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(() => {
      setPathD('M98.3318 190.694C-10.6597 291.485 121.25 273.498 148.233 315');
      setTimeout(() => {
        setPathD(
          'M98.3318 190.694C-10.6597 291.485 121.25 273.498 148.233 295'
        );
      }, 60);
    }, 130);
  };

  const handleMouseLeave = () => {
    setPathD('M98.3318 190.694C-10.6597 291.485 121.25 273.498 148.233 295');
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, []);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="dark:bg-white rounded-lg"
    >
      <path
        d="M97.8357 54.6682C177.199 59.5311 213.038 52.9891 238.043 52.9891C261.298 52.9891 272.24 129.465 262.683 152.048C253.672 173.341 100.331 174.196 93.1919 165.763C84.9363 156.008 89.7095 115.275 89.7095 101.301"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={pathD}
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M98.3301 190.694C99.7917 213.702 101.164 265.697 100.263 272.898"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M208.308 136.239C208.308 131.959 208.308 127.678 208.308 123.396"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M177.299 137.271C177.035 133.883 177.3 126.121 177.3 123.396"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M203.398 241.72C352.097 239.921 374.881 226.73 312.524 341.851"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M285.55 345.448C196.81 341.85 136.851 374.229 178.223 264.504"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M180.018 345.448C160.77 331.385 139.302 320.213 120.658 304.675"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M218.395 190.156C219.024 205.562 219.594 220.898 219.594 236.324"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M218.395 190.156C225.896 202.037 232.97 209.77 241.777 230.327"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M80.1174 119.041C75.5996 120.222 71.0489 119.99 66.4414 120.41"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M59.5935 109.469C59.6539 117.756 59.5918 125.915 58.9102 134.086"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M277.741 115.622C281.155 115.268 284.589 114.823 287.997 114.255"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M291.412 104.682C292.382 110.109 292.095 115.612 292.095 121.093"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M225.768 116.466C203.362 113 181.657 115.175 160.124 118.568"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
