import { Button } from '@heroui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          404
        </h1>

        <h2 className="text-4xl font-bold mb-6 tracking-tight">
          Page Not Found
        </h2>

        <p className="text-xl text-default-600 dark:text-default-500 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the
          digital void.
        </p>

        <Button
          as={Link}
          href="/"
          color="primary"
          variant="shadow"
          className="group inline-flex items-center space-x-2"
        >
          <ArrowLeft className="size-5 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Button>
      </div>
    </div>
  );
}
