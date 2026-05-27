import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Arthakosh — Financial Literacy for Real Life",
  description:
    "A premium platform for financial literacy and real-life money decision making. Designed for Indian students, young professionals, freelancers, and working adults.",
  manifest: "/manifest.json",
  keywords: [
    "financial literacy",
    "India",
    "money management",
    "SIP calculator",
    "EMI calculator",
    "financial planning",
    "salary negotiation",
    "budget planner",
  ],
  authors: [{ name: "Arthakosh" }],
  openGraph: {
    title: "Arthakosh — Financial Literacy for Real Life",
    description:
      "Help people handle real financial situations intelligently. Not just investing — real life.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground">
        <ThemeProvider>
          <TooltipProvider>
            <AppShell>
              {children}
            </AppShell>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
