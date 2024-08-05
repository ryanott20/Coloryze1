import { redirect } from "next/navigation";
import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";

import { UserNav } from "@/components/UserNav";
import Logo from "@/components/Logo";
import Questions from "@/components/Questions";
import UserInformation from "@/components/UserInformation";
import CountdownTimer from "@/components/CountdownTimer";
import CompletedReview from "@/components/completedreview/CompletedReview";

import Hotjar from "@hotjar/browser";

//send email
import { Resend } from "resend";

import ContactUs from "@/components/completedreview/ContactUs";
import { Button } from "@/components/ui/button";

export default async function Home() {
  async function sendEmail(emailType: String, userData: any) {
    console.log("emailing...");
    //post to /api/send
    const response = await fetch(`https://app.ivyfy.me/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailType: emailType,
        email: userData,
      }),
    });
    //get the response json
    const data = await response.json();
    console.log(data);
  }
  const {
    data: { session },
  } = await createSupabaseServerComponentClient().auth.getSession();

  //INITIAL USER SCHEMA CREATION
  if (session) {
    const supabase = await createSupabaseServerComponentClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", session?.user?.id ?? '')

      console.log(data);

    if (data && data.length === 0) {
      console.log(data);
      //send Email      console.log("creating user");

      console.log("creating user");
      const { data: data1, error } = await supabase.from("users").insert([
        {
          uid: session.user.id,
          name: session.user.user_metadata.full_name,
          email: session.user.email,
          onboarded: false,
          admin: false,
          // version: 2,
        },
      ]);

      if (error) {
        console.log("error creating user", error);
      }

      // sendEmail("welcome", session.user.email);
    }
  }

  //If user has not completed onboarding, show onboarding questions
  const supabase = await createSupabaseServerComponentClient();
  const { data: userDataOnboarding } = await supabase
    .from("users")
    .select("*")
    .eq("uid", session?.user?.id ?? '')
    .single();

  if (userDataOnboarding && userDataOnboarding.onboarded === false) {
    if (session) {
      //console.log("onboarding");
      return (
        <div className="py-6 ">
          <div className="border-b">
            <UserNav />
          </div>
          <div className="px-[48px] py-[24px] md:px-[250px] md:py-[22px] sm:px-[8px] sm:py-[6px]">
            <Questions />
          </div>
        </div>
      );
    }
  }

  //if onboarding is complete but plan is free then go to pricing page
  const { data: userDataPricing } = await supabase
    .from("users")
    .select("*")
    .eq("uid", session?.user?.id ?? '')
    .single();

  if (
    userDataPricing &&
    userDataPricing.onboarded === true &&
    userDataPricing.plan === "free"
  ) {
    //console.log("redirecting to pricing page");
    redirect("/pricing");
  }

  // if user has completed onboarding but no review has been submitted, this can be determined by review_complted being false
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("uid", session?.user?.id ?? '')
    .single();

  //if review not complete show  waiting dashboard
  if (userData && userData.review_completed === false) {
    if (session) {
      return (
        <div className="flex flex-col md:flex px-8">
          <div className="border-b">
            <UserNav />
          </div>
          <div className="lg:px-48 md:px-24 py-12">
            <div className="flex flex-col lg:flex-row gap-5 mt-10">
              <div className="lg:w-1/2 ">
                <CountdownTimer userData={userData} />
                <div className="mt-5">
                  <ContactUs />
                </div>
              </div>
              <div className="lg:w-1/2">
                <UserInformation userData={userData} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  //if review complete show completed review
  if (userData && userData.review_completed === true) {
    if (session) {
      return (
        <div className="flex flex-col md:flex">
          <div className="border-b">
            <div className="border-b">
              <UserNav />
            </div>
          </div>
          <div className="px-4 py-4 md:px-24 lg:px-48 md:py-12">
            <CompletedReview userData={userData} />
          </div>
        </div>
      );
    }
  }

  return <div>Error...</div>;
}
