import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThanosUniverse from "@/components/ThanosUniverse";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Abhishek Gour | Systems Engineer",
    template: "%s | Abhishek Gour",
  },
  description:
    "Systems Engineer building web applications, developer tools, and systems to explore how software works under the hood.",
  keywords: [
    "Abhishek Gour",
    "Systems Engineer",
    "Compiler Engineer",
    "Systems Programmer",
    "C++",
    "LLVM",
    "Wayland",
    "Next.js",
    "Spring Boot",
    "Portfolio",
  ],
  authors: [{ name: "Abhishek Gour" }],
  creator: "Abhishek Gour",
  metadataBase: new URL("https://abhishekgour.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Abhishek Gour | Tinexus-HQ",
    title: "Abhishek Gour | Systems Engineer",
    description:
      "Personal engineering portfolio focused on web applications, developer tools, and systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Gour | Systems Engineer",
    description: "Personal engineering portfolio focused on web applications, developer tools, and systems.",
    creator: "@abhishekgour1",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0a0a0a] dark:text-white transition-colors duration-300">
        <Providers>
          <div id="universe-wrapper" className="min-h-full flex flex-col flex-1">
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <Analytics />
          </div>
          <ThanosUniverse />
        </Providers>
      </body>
    </html>
  );
}
