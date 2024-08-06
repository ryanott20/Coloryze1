// @ts-nocheck

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { headers } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import dynamic from "next/dynamic";
import Script from "next/script";

// import Metrics from "./metrics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PediatRx",
  description:
    "Streamline pediatric dosage calculations.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const CrispWithNoSSR = dynamic(() => import("@/components/Crisp"));
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";

  const {
    data: { session },
  } = await createSupabaseServerComponentClient().auth.getSession();

  return (
    <html lang="en">
      {/* <CrispWithNoSSR /> */}
      <GoogleAnalytics gaId="G-0KT9MVD6R9" />

      <body className={`${inter.className} flex flex-col min-h-[98vh]`}>
        <div className="flex-grow">
          {children}
          {/* <Metrics /> */}
        </div>
        {/* footer */}
        {/* Footer content goes here */}

        {/* <footer> */}
          {/* <Footer /> */}
        {/* </footer> */}
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
