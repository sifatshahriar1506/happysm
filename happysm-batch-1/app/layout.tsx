import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "happysm — small steps, better wellbeing", template: "%s | happysm" },
  description: "Understand your habits, measurements, and everyday wellbeing with transparent, educational tools.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
