'use client';

import Link from 'next/link';
import { Button } from '@heroui/button';
import { Logo } from '@/components/logo';
import { ArrowRight } from 'lucide-react';
import { AnimatedTypingText } from '@/components/animated-typing-text';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Logo width={180} height={180} />
          </div>

          <AnimatedTypingText
            texts={['Welcome to Askly AI', 'Your Smart Assistant']}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          />

          <p className="text-xl md:text-2xl text-default-600 dark:text-default-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your intelligent assistant for smarter conversations and faster
            solutions
          </p>

          <Button
            as={Link}
            href="/sign-in"
            color="primary"
            variant="shadow"
            size="lg"
            className="group inline-flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="size-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
          </Button>
        </div>
      </header>
    </div>
  );
}
