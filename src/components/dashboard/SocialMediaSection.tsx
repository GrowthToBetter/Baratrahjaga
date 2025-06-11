/* eslint-disable @typescript-eslint/no-explicit-any */
// dashboard/components/SocialMediaSection.tsx
"use client";

import Link from "next/link";
import { memo } from "react";
import { SOCIAL_LINKS } from "../constants/data";

const SocialMediaSection = memo(() => {
  return (
    <section className="w-full py-12 sm:py-16 relative bg-blend-overlay">

      <div className="relative container mx-auto px-4 sm:px-6 text-center max-w-2xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-white">
          Temukan Saya di Media Sosial
        </h2>
        <SocialMediaLinks />
      </div>
    </section>
  );
});

const SocialMediaLinks = memo(() => (
  <ul className="flex justify-between items-center gap-4">
    {SOCIAL_LINKS.map(({ href, icon: Icon, hoverColor, label }) => (
      <li key={label} className="w-full max-w-sm">
        <SocialLink
          href={href}
          Icon={Icon}
          hoverColor={hoverColor}
          label={label}
        />
      </li>
    ))}
  </ul>
));

const SocialLink = memo(
  ({
    href,
    Icon,
    hoverColor,
    label,
  }: {
    href: string;
    Icon: any;
    hoverColor: string;
    label: string;
  }) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-md bg-white/5 text-white transition-all duration-200 ${hoverColor} hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50`}
      aria-label={label}>
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
      <span className="text-sm sm:text-base font-medium">{label}</span>
    </Link>
  )
);

SocialMediaSection.displayName = "SocialMediaSection";
SocialMediaLinks.displayName = "SocialMediaLinks";
SocialLink.displayName = "SocialLink";

export default SocialMediaSection;
