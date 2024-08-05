import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FaRocketchat } from "react-icons/fa";

export default async function ContactUs() {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <FaRocketchat className="inline-block mr-2 text-black" />
          Contact Us
        </CardTitle>

        <CardDescription>
          We&apos;re here to help! Have questions or concerns? Reach out to us.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center font-medium text-black text-xl">
          Email us at{" "}
          <a
            href="mailto:founders@ivyfy.me"
            className="ml-1 underline hover:text-blue-200 transition duration-300"
          >
            founders@ivyfy.me
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
