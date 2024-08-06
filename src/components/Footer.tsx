"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { FaTiktok } from "react-icons/fa";

export function Footer() {
  return (
    <div className="container flex flex-col items-center justify-between mb-1 pb-8 lg:px-48 md:px-24 ">
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
      <div className="flex items-center gap-8">
        <Logo width={100} height={30} fill={"black"} />
    

        <p className="text-center text-md leading-loose md:text-left">
  <a
    target="_blank"
    rel="noreferrer"
    className="font-medium underline underline-offset-4"
  >
    Redefining
  </a>{" "}
  the way you apply to college.
</p>
<a href = "https://www.tiktok.com/@dylanott?lang=en" target="_blank">
<FaTiktok />
</a>
</div>

      </div>
      <p className="text-center text-sm leading-loose md:text-left pt-4">
      PediatRx is not affiliated with MIT, Penn, Princeton, Yale, the Ivy League, or the Common App.
    </p>
    </div>
  );
}
