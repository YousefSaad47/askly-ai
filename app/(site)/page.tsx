import Link from 'next/link';
import { Button } from '@heroui/button';
import { Logo } from '@/components/logo';
import { CloudLightning, Shield, Brain, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <CloudLightning className="size-10 text-blue-600" />,
      title: 'Lightning Fast',
      description: 'Get instant responses to all your questions',
    },
    {
      icon: <Shield className="size-10 text-blue-600" />,
      title: 'Secure & Private',
      description: 'Your conversations are always protected',
    },
    {
      icon: <Brain className="size-10 text-blue-600" />,
      title: 'Always Learning',
      description: 'Continuously improving to serve you better',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="pt-24 pb-16 md:pt-32 md:pb-20">
            <div className="text-center">
              <div className="flex justify-center mb-8 animate-fade-in">
                <Logo width={180} height={180} />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Welcome to{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                  Askly AI
                </span>
              </h1>
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

          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white dark:bg-[#17171a] shadow-lg hover:shadow-xl transition-all duration-200 border border-default-200 dark:border-default-100"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-default-600 dark:text-default-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
