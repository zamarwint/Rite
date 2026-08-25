import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import { Plus_Jakarta_Sans, Lora, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import Loading from "./loading";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rite",
  description: "A productivity suite for writers, planners, bloggers, content creators, journalists, etc.",
  metadataBase: process.env.APP_URL as string,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: "Rite",
    description: "A productivity suite for writers, planners, bloggers, content creators, journalists, etc.",
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: "Rite",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rite",
    description: "A productivity suite for writers, planners, bloggers, content creators, journalists, etc.",
    images: ['/og.png'],
  },
  keywords: ["AI", "Productivity", "Writing", "Planning", "Blogging", "Content Creation", "Journalism"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", fontSans.variable, fontSerif.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}