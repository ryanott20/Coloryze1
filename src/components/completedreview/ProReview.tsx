import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FaMedal,
  FaLightbulb,
  FaPenFancy,
  FaRegNewspaper,
  FaPaperclip,
  FaCheck,
  FaGlobe,
} from "react-icons/fa";
import UserInformation from "../UserInformation";
import ContactUs from "./ContactUs";
import ExportToPDFButton from "../pdf/ExportToPDFButton";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import QnA from "./QnA";
import ScheduleCall from "./ScheduleCall";
import ActivitiesSection from "./ActivitiesSection";

export const ProReview: React.FC<{ userData: any }> = ({ userData }) => {
  const getGradeColor = (grade: string) => {
    switch (grade.charAt(0).toUpperCase()) {
      case "A":
        return "bg-green-700 text-white"; // Dark Green for excellence
      case "B":
        return "bg-yellow-700 text-white"; // Lighter Green for good
      case "C":
        return "bg-orange-700 text-white"; // Yellow for average
      case "D":
        return "bg-red-400 text-white"; // Light Red for below average
      case "F":
        return "bg-red-700 text-white"; // Dark Red for failing
      default:
        return "bg-gray-950 text-white"; // Gray for undefined or non-standard grades
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <Card className="p-6 bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <FaCheck className="inline-block mr-2 text-green-500" />
              Review Complete
            </CardTitle>
            <CardDescription>
              You&apos;re one step closer to your dream college!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <ExportToPDFButton userData={userData} plan={userData.plan} />

              <Link
                href={"https://forms.gle/ZwA9JqB8VAuMaZr9A"}
                className={buttonVariants({ variant: "outline" })}
              >
                Feedback Form
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <FaMedal className="inline-block mr-2 text-yellow-500" />
              Grades
            </CardTitle>
            <CardDescription>
              Review of your grades and academic performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple">
              <AccordionItem className="h-full" value="gpa">
                <div className="flex items-center justify-between">
                  <AccordionTrigger>Academics</AccordionTrigger>
                  <div
                    className={`flex items-center justify-center rounded-lg text-2xl h-10 w-10 font-bold ${getGradeColor(
                      userData.academic_review.grade
                    )}`}
                  >
                    {userData.academic_review.grade}
                  </div>
                </div>
                <AccordionContent className="h-full overflow-y-auto">
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <b>Classes, Grades, GPA and Test Scores </b>
                    </div>
                    <div>{userData.academic_review.reasoning}</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="extracurriculars">
                <div className="flex items-center justify-between">
                  <AccordionTrigger>Extracurriculars</AccordionTrigger>
                  <div
                    className={`flex items-center justify-center rounded-lg text-2xl h-10 w-10 font-bold ${getGradeColor(
                      userData.extracurriculars_reviews.grade
                    )}`}
                  >
                    {userData.extracurriculars_reviews.grade}
                  </div>
                </div>
                <AccordionContent className="h-full overflow-y-auto">
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <b>Clubs, Officer Positions, Dedication and Impact </b>
                    </div>
                    <div>{userData.extracurriculars_reviews.reasoning}</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="classes">
                <div className="flex items-center justify-between">
                  <AccordionTrigger>Intellectual Exploration</AccordionTrigger>
                  <div
                    className={`flex items-center justify-center rounded-lg text-2xl h-10 w-10 font-bold ${getGradeColor(
                      userData.classes_reviews.grade
                    )}`}
                  >
                    {userData.classes_reviews.grade}
                  </div>
                </div>
                <AccordionContent className="h-full overflow-y-auto">
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <b>
                        Out-Of-School Activities, Research, Summer Programs,
                        Hooks and Uniqueness
                      </b>
                    </div>
                    <div>{userData.classes_reviews.reasoning}</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <div className="text-sm">
              <div style={{ marginBottom: "10px" }}>
                <b>A:</b> Strong contender for Ivy League or t25{" "}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <b>B:</b> Strong contender for highly selective schools{" "}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <b>C:</b> Contender for moderately selective schools{" "}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <b>D:</b> Needs improvement for selective schools{" "}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <b>F:</b> Hurting your chances, needs significant improvement{" "}
              </div>
              Your grades and comments are based on the information you
              provided.
            </div>
          </CardFooter>
        </Card>

        <UserInformation userData={userData} />

        <ContactUs />
        {userData.plan !== "basic" && <QnA />}

        <ScheduleCall />
      </div>

      <div className="space-y-8">
        <Card className="p-6 bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <FaRegNewspaper className="inline-block mr-2 text-purple-500" />{" "}
              College Narrative
            </CardTitle>
            <CardDescription>
              How you should position yourself within your college application-
              including ECs, essays and interviews.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple">
              <AccordionItem value="spike1">
                <AccordionTrigger>College Narrative</AccordionTrigger>
                <AccordionContent className="h-full overflow-y-auto">
                  {/* <div className="list-disc pl-6 text-gray-700 leading-relaxed">
                    {Array.isArray(userData.narrative_review) ? (
                      // userData.narrative_review.map((comment, index) => (
                        // <div key={index}>{comment}</div>
                      // ))
                    ) : (
                      <div>{userData.narrative_review}</div>
                    )} */}
                  {/* </div> */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <FaPaperclip className="inline-block mr-2 text-green-500" />
              College Spikes
            </CardTitle>
            <CardDescription>
              The specific field you should specialize and stand out in. By the
              time you apply, you should be able to show your passion and
              dedication in this field.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple">
              <AccordionItem value="spike1">
                <div className="flex items-center justify-between">
                  <AccordionTrigger>
                    Spike 1: {userData.spike_review.spike1.title}
                  </AccordionTrigger>
                  <div></div>
                </div>
                <AccordionContent className="h-full overflow-y-auto">
                  {userData.spike_review.spike1.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="spike2">
                <div className="flex items-center justify-between">
                  <AccordionTrigger>
                    Spike 2: {userData.spike_review.spike2.title}
                  </AccordionTrigger>
                  <div></div>
                </div>
                <AccordionContent className="h-full overflow-y-auto">
                  {userData.spike_review.spike2.description}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <FaLightbulb className="inline-block mr-2 text-blue-500" />
              Extracurricular Suggestions
            </CardTitle>
            <CardDescription>
              Potential ideas for extracurriculars and essays.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple">
              <AccordionItem value="extracurricular-ideas">
                <AccordionTrigger> EC Idea 1</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                    {userData.spike_review.spike1.extracurricularIdea}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="essay-ideas">
                <AccordionTrigger>EC Idea 2</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                    {userData.spike_review.spike2.extracurricularIdea}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <FaPenFancy className="inline-block mr-2 text-orange-500" />
              College Essays
            </CardTitle>
            <CardDescription>
              Write your essays with the goal to develop your spike. Make sure
              to always sound like yourself in your essays and use our pointers
              below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple">
              <AccordionItem value="spike1">
                <div className="flex items-center justify-between">
                  <AccordionTrigger>Essay Idea 1</AccordionTrigger>
                  <div></div>
                </div>
                <AccordionContent className="h-full overflow-y-auto">
                  {userData.spike_review.spike1.essayIdea}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="spike2">
                <div className="flex items-center justify-between">
                  <AccordionTrigger>Essay Idea 2</AccordionTrigger>
                  <div></div>
                </div>
                <AccordionContent className="h-full overflow-y-auto">
                  {userData.spike_review.spike2.essayIdea}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <FaGlobe className="inline-block mr-2 text-green-800" />
              Overall Comments
            </CardTitle>
            <CardDescription>
              General comments about your whole application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <ul className="list-disc pl-6 text-gray-700 leading-relaxed"> */}
              {/* {userData.overall_comments.map((comment, index) => ( */}
                {/* <li key={index}>{comment}</li> */}
              {/* ))} */}
            {/* </ul> */}
          </CardContent>
        </Card>

        <ActivitiesSection userData={userData} />

        <Card className="p-6 bg-white rounded-lg shadow-md">
          <CardHeader>
            {userData.review_person == "ryan" && (
              <div className="flex items-center">
                <img
                  src="ryan.png"
                  className="rounded-full h-20 w-20 mr-12"
                  alt="Ryan's Profile Picture"
                />
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    Reviewed by Ryan Ott
                  </CardTitle>
                  <CardDescription>
                    <b>Email:</b> founders@ivyfy.me
                    <br />
                    <b>About:</b> Hey! I&apos;m Ryan, an incoming student at
                    University of Virginia. It was a pleasure to review your
                    application, and I wish you the very best in your college
                    application journey!
                  </CardDescription>
                </div>
              </div>
            )}

            {userData.review_person == "dylan" && (
              <div className="flex items-center">
                <img
                  src="dylan.png"
                  className="rounded-full h-20 w-20 mr-12"
                  alt="Dylan's Profile Picture"
                />
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    Reviewed by Dylan Ott
                  </CardTitle>
                  <CardDescription>
                    <b>Email:</b> founders@ivyfy.me
                    <br />
                    <b>About:</b> Hey! I&apos;m Dylan, an incoming student at
                    Penn&apos;s M&T Program. It was a pleasure to review your
                    application, and I wish you the very best in your college
                    application journey!
                  </CardDescription>
                </div>
              </div>
            )}

            {userData.review_person == "david" && (
              <div className="flex items-center">
                <img
                  src="david.png"
                  className="rounded-full h-20 w-20 mr-12"
                  alt="David's Profile Picture"
                />
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    Reviewed by David Lomelin
                  </CardTitle>
                  <CardDescription>
                    <b>Email:</b> founders@ivyfy.me
                    <br />
                    <b>About:</b> Hey! I&apos;m David, an incoming student at
                    MIT. It was a pleasure to review your application, and I
                    wish you the very best in your college application journey!
                  </CardDescription>
                </div>
              </div>
            )}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
