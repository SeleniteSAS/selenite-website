type HeroProps = {
  title: string;
  subtitle: string;
  description: string;
};

export default function Hero({ title, subtitle, description }: HeroProps) {
  return (
    <section className="flex h-[calc(100vh-10rem)] w-full flex-col items-start justify-center px-6 pb-32 font-poppins text-black md:px-24">
      <div>
        <div className="flex flex-col items-center gap-8 px-8 md:flex-row">
          <h1 className="text-2xl font-bold uppercase md:text-xl md:wm-vertical">{title}</h1>
          <h3 className="text-center text-xl sm:text-2xl md:text-left md:text-3xl">{subtitle}</h3>
        </div>
        <p className="text-md mt-8 text-center sm:text-lg md:text-xl">{description}</p>
        <svg
          width="42"
          height="42"
          viewBox="0 0 341 344"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mt-16"
        >
          <path
            d="M0.550049 7.14977L7.65063 0.0497901L170.75 163.15L333.85 0.0498044L340.95 7.14978L170.75 177.35L0.550049 7.14977Z"
            fill="black"
          />
          <path
            d="M0.550049 173.75L7.65063 166.75L170.75 329.85L333.85 166.75L340.95 173.75L170.75 343.95L0.550049 173.75Z"
            fill="black"
          />
        </svg>
      </div>
    </section>
  );
}
