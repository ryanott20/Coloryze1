import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/app/login/components/UserAuthForm";
import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Login – Dosage Calculator  ",
  description: "Login to Free Dosage Calculator.",
};

export default async function AuthenticationPage() {
  //if logged in, redirect to home page
  const {
    data: { session },
  } = await createSupabaseServerComponentClient().auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <div className="container relative flex flex-col items-center justify-center w-full h-screen m-0 p-0 md:grid max-w-none grid-cols-2 lg:px-0">
        <div className="hidden md:flex relative flex h-half md:h-full flex-col bg-muted p-0 md:p-20 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-[#004684]" />
          <div className="relative z-20 flex items-center text-lg font-medium">
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-xl">
               Free Dosage Calculator
              </p>
              <footer className="text-sm">Made at MIT & Johns Hopkins</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-8 md:p-8 md:w-full">
          <div className="mx-auto w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-full md:space-y-6 md:px-4 md:py-8">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-sm text-muted-foreground leading-6">
                Login with Google to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground leading-6">
              By clicking continue, you agree to our{" "}
              <Link
                href="/tos"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
