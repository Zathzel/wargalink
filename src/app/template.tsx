"use client";

import { FadeIn } from "@/components/ui/animated-container";

export default function Template({ children }: { children: React.ReactNode }) {
  return <FadeIn direction="up" className="h-full w-full">{children}</FadeIn>;
}
