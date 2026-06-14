import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AudioProvider } from "@/components/AudioProvider";
import { AchievementProvider } from "@/components/AchievementSystem";
import { GlobalStarfield } from "@/components/GlobalStarfield";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });

export const metadata: Metadata = {
  title: "A Story of Impact",
  description: "A digital experience celebrating an amazing sister.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} ${caveat.variable} ${hanken.variable} font-sans antialiased bg-[#0a0a0f] text-white`}>
        <AudioProvider>
          <AchievementProvider>
            <GlobalStarfield />
            <SmoothScroll>{children}</SmoothScroll>
          </AchievementProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
