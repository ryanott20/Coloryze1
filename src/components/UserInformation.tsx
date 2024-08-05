"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FaUser } from "react-icons/fa";

import { Skeleton } from "@/components/ui/skeleton";

const UserInformation: React.FC<{ userData: any }> = ({ userData }) => {
  if (!userData) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-[80%]" />
        </div>
      </div>
    );
  }

  async function editAnswers() {
    //set onboarding to false
    const supabase = createSupabaseBrowserClient();
    const session = await createSupabaseBrowserClient().auth.getSession();
    if (session) {
      const { data, error } = await supabase
        .from("users")
        .update({
          onboarded: false,
        })
        .eq("uid", session.data.session?.user.id);
    }
    window.location.reload();
  }

  return (
    <Card className="shadow-md p-6 bg-white rounded-lg ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <FaUser className="inline-block mr-2 text-red-500" />
          User Information
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple">
          <AccordionItem value="personal-info">
            <AccordionTrigger>Personal Information</AccordionTrigger>
            <AccordionContent>
              <div className="border border-gray-300 p-4 rounded-lg">
                <p className="text-gray-700">Name: {userData.name}</p>
                <Separator className="my-2 border-gray-300" />
                <p className="text-gray-700">Email: {userData.email}</p>
                <Separator className="my-2 border-gray-300" />
                <p className="text-gray-700">School: {userData.school}</p>
                <Separator className="my-2 border-gray-300" />
                <p className="text-gray-700">
                  Is Magnet School: {userData.is_magnet_school ? "Yes" : "No"}
                </p>
                <Separator className="my-2 border-gray-300" />
                <p className="text-gray-700">
                  Graduation Year: {userData.graduation_year}
                </p>
                <Separator className="my-2 border-gray-300" />
                <p className="text-gray-700">Hooks: {userData.hooks}</p>
                <Separator className="my-2 border-gray-300" />
                <p className="text-gray-700">
                  Additional Information: {userData.additional_info}
                </p>
                <Separator className="my-2 border-gray-300" />
                <p className="text-gray-700">Major: {userData.major}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="academic-info">
            <AccordionTrigger>Academic Information</AccordionTrigger>
            <AccordionContent>
              <div className="border border-gray-300 p-4 rounded-lg">
                <div>GPA: {userData.gpa}</div>
                <div className="my-2 border-t border-gray-300"></div>
                <div>SAT Score: {userData.sat_score}</div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {userData.version == 1 && (
            <AccordionItem value="extracurriculars">
              <AccordionTrigger>Extracurriculars</AccordionTrigger>
              <AccordionContent>
                <div className="border border-gray-300 p-4 rounded-lg">
                  <ul className="">
                    {userData.extracurriculars.map((activity, index) => (
                      <li key={index} className="">
                        {activity}
                        {index !== userData.extracurriculars.length - 1 && (
                          <div className="my-2 border-t border-gray-300"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          {userData.version !== 1 && (
            <AccordionItem value="extracurriculars">
              <AccordionTrigger>Extracurriculars</AccordionTrigger>
              <AccordionContent>
                <div className="border border-gray-300 p-4 rounded-lg">
                  <ul className="">
                    {userData.extracurriculars.map((activity, index) => (
                      <li key={index} className="">
                        <p>
                          <strong>Position/Leadership:</strong>{" "}
                          {activity.position}
                        </p>
                        <p>
                          <strong>Organization:</strong> {activity.organization}
                        </p>
                        <p>
                          <strong>Description:</strong> {activity.description}
                        </p>
                        <p>
                          <strong>Grade Levels:</strong> {activity.gradeLevels}
                        </p>
                        <p>
                          <strong>Timing:</strong> {activity.timing}
                        </p>
                        <p>
                          <strong>Hours per Week:</strong>{" "}
                          {activity.hoursPerWeek}
                        </p>
                        <p>
                          <strong>Weeks per Year:</strong>{" "}
                          {activity.weeksPerYear}
                        </p>
                        {index !== userData.extracurriculars.length - 1 && (
                          <div className="my-2 border-t border-gray-300"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          <AccordionItem value="classes">
            <AccordionTrigger>Classes</AccordionTrigger>
            <AccordionContent>
              <div className="border border-gray-300 p-4 rounded-lg">
                <ul>
                  {userData.classes.map((class_, index) => (
                    <li key={index}>{class_}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="top-colleges">
            <AccordionTrigger>Top Colleges</AccordionTrigger>
            <AccordionContent>
              <div className="border border-gray-300 p-4 rounded-lg">
                <ul>
                  {userData.top_colleges.map((college, index) => (
                    <li key={index}>{college}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      {userData.review_completed == false && (
        <CardFooter>
          {/* Add a button to edit answers*/}
          <Button variant={"default"} onClick={editAnswers}>
            Edit Information
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UserInformation;
