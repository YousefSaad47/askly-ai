export const GradientBackground = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed hidden dark:block dark:opacity-100 -bottom-[30%] -left-[30%] z-[9999] pointer-events-none"
      >
        <img
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/docs-left.png"
          className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="left background"
          data-loaded="true"
        />
      </div>
      <div
        aria-hidden="true"
        className="fixed hidden dark:block dark:opacity-70 -top-[50%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-[9999] pointer-events-none rotate-12"
      >
        <img
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/docs-right.png"
          className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="right background"
          data-loaded="true"
        />
      </div>
    </>
  );
};
