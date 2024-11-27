import HeroImage from "@/assets/images/hero.png";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Link } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm tracking-tight">
          Introducing InvoiceMarshal Tutorial by Heath Babb
        </span>
        <h1 className="mt-8 font-semibold text-4xl tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          Invoicing made{" "}
          <span className="-mt-2 block bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent">
            super easy!
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-muted-foreground lg:text-lg">
          Creating Invoices can be a pain! We at InvoiceMarshal make it super easy for you to get paid on time!
        </p>

        <div className="mt-7 mb-12">
          <Link href="/login">
            <RainbowButton>Get Unlimited Access</RainbowButton>
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-12 w-full items-center py-12">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          className="-mt-24 absolute inset-0 blur-3xl"
          style={{ zIndex: -1 }}
          fill="none"
          viewBox="0 0 400 400"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z" fill="#03FFE0" />
              <path d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z" fill="#7C87F8" />
              <path d="M320 400H400V78.75L106.2 134.75L320 400Z" fill="#4C65E4" />
              <path d="M400 0H128.6L106.2 134.75L400 78.75V0Z" fill="#043AFF" />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="720.666"
              id="filter0_f_10_20"
              width="720.666"
              x="-160.333"
              y="-160.333"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_10_20" stdDeviation="80.1666" />
            </filter>
          </defs>
        </svg>
        <Image
          src={HeroImage}
          alt="Hero Image"
          className="relative w-full rounded-lg border object-cover shadow-2xl lg:rounded-2xl"
        />
      </div>
    </section>
  );
}
