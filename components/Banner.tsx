import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

const Banner = async () => {
  const { userId } = await auth();
  return (
    <>
      {!userId && (
        <div className="relative z-50 isolate flex items-center gap-x-6 overflow-hidden bg-background border-b-1 border-divider px-6 py-2 sm:px-3.5 sm:before:flex-1">
          <div
            aria-hidden="true"
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] dark:from-[#F54180] dark:to-[#338EF7] opacity-20 dark:opacity-10"
              style={{
                clipPath:
                  'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
              }}
            ></div>
          </div>
          <div
            aria-hidden="true"
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] dark:from-[#F54180] dark:to-[#338EF7] opacity-30 dark:opacity-20"
              style={{
                clipPath:
                  'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
              }}
            ></div>
          </div>
          <div className="flex w-full items-center justify-between md:justify-center gap-x-3">
            <div className="text-small flex items-end sm:text-[0.93rem] text-foreground hover:opacity-80 transition-opacity">
              <span aria-label="rocket" className="hidden md:block" role="img">
                🚀
              </span>
              <span
                className="inline-flex md:ml-1 animate-text-gradient font-medium bg-clip-text text-transparent bg-[linear-gradient(90deg,#D6009A_0%,#8a56cc_50%,#D6009A_100%)] dark:bg-[linear-gradient(90deg,#FFEBF9_0%,#8a56cc_50%,#FFEBF9_100%)]"
                style={{
                  fontSize: 'inherit',
                  backgroundSize: '200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Askly AI Best AI Agent Helper
              </span>
            </div>

            <div className="flex group min-w-[120px] items-center font-semibold text-foreground shadow-sm gap-1.5 relative overflow-hidden rounded-full p-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F54180_0%,#338EF7_50%,#F54180_100%)]"></span>
              <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background group-hover:bg-background/70 transition-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
                <Link href="/auth/sign-in">Sign in</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="outline-none transition-transform group-hover:translate-x-0.5 [&>path]:stroke-[2px]"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 12h16m0 0l-6-6m6 6l-6 6"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
