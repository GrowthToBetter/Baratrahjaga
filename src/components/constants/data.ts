// dashboard/constants/data.ts
import {  Instagram, Linkedin, Mail, Github } from "lucide-react";


export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/baratrahjaga?igsh=dTkwOW1sbnRjMXpz ",
    icon: Instagram,
    hoverColor: "hover:text-pink-500",
    label: "Instagram",
  },
  {
    href: "https://github.com/GrowthToBetter",
    icon: Github,
    hoverColor: "hover:text-slate-300",
    label: "Github",
  },
  {
    href: "https://www.linkedin.com/in/jean-richnerd-rantabaratrahjaga-1b17ba233 ",
    icon: Linkedin,
    hoverColor: "hover:text-blue-700",
    label: "LinkedIn",
  },
  {
    href: "mailto:baratrahjaga@email.com",
    icon: Mail,
    hoverColor: "hover:text-green-400",
    label: "Email",
  },
] as const;

export const ANIMATION_VARIANTS = {
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
} as const;