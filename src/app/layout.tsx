import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from './header/header';
import Footer from './footer/footer';
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import dynamic from "next/dynamic";
import Script from "next/script";
import ThemeWrapper from './ThemeWrapper';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PediatRx",
  description: "Streamline pediatric dosage calculations.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const CrispWithNoSSR = dynamic(() => import("@/components/Crisp"));

  const {
    data: { session },
  } = await createSupabaseServerComponentClient().auth.getSession();

  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-0KT9MVD6R9" />
      <body className={`${inter.className} flex flex-col min-h-[98vh]`}>
        <div className="flex-grow">
          <ThemeWrapper>
            <Header />
            {children}
            <Footer />
          </ThemeWrapper>
        </div>
      </body>
    </html>
  );
}