"use client";
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
import { FaPhone } from "react-icons/fa";
import { Button } from "../ui/button";

const ScheduleCall: React.FC = () => {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <FaPhone className="inline-block mr-2 text-blue-500" />
          Schedule a Call
        </CardTitle>
        <CardDescription>
          Book a 30-minute call with one of our team members to discuss your
          application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="call-details">
            <AccordionTrigger>What the Call Includes</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                <li>
                  <strong>Comprehensive application review</strong> with
                  detailed feedback
                </li>
                <li>
                  <strong>Personalized Q&amp;A session</strong> to address your
                  specific concerns
                </li>
                <li>
                  <strong>Strategic planning</strong> to enhance your
                  application and boost your chances
                </li>
                <li>
                  <strong>Insider insights</strong> and tips from our successful
                  team members
                </li>
                <li>
                  <strong>Tailored recommendations</strong> for
                  extracurriculars, essays, and more
                </li>
                <li>
                  <strong>Continued email support</strong> after the call for
                  any follow-up questions
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="team">
            <AccordionTrigger>Meet Our Team</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Dylan Ott</h3>
                  <p className="text-sm text-gray-600">
                    <a href="https://tiktok.com/@dylanott">@dylanott</a>
                  </p>
                  <p className="text-sm text-gray-600">Penn M&amp;T &apos;28</p>
                  <p className="mt-2">
                    Hey everyone! I&apos;m Dylan, an incoming student at
                    Penn&apos;s M&amp;T Program! During my free time, I play
                    soccer and go to the gym. I also love to code and build
                    websites. I love hearing about startups and technology and
                    helping students write the perfect essay.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">David Lomelin</h3>
                  <p className="text-sm text-gray-600">@davidlomelin</p>
                  <p className="text-sm text-gray-600">MIT &apos;28</p>
                  <p className="mt-2">
                    Hi! I&apos;m David, an incoming student at MIT! For fun,
                    I&apos;ve recently been reading through the 3 Body Problem
                    series (highly recommend!) and like to work out. I&apos;m
                    interested in AI and Computer Science, and especially love
                    to work with students to develop their nonprofits.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Ryan Ott</h3>
                  <p className="text-sm text-gray-600">@ryanott20</p>
                  <p className="text-sm text-gray-600">UVA &apos;28</p>
                  <p className="mt-2">
                    Hey, I&apos;m Ryan, an incoming student at UVA! Whenever
                    I&apos;m free, I love to hang out with friends and coach
                    basketball. I&apos;ve gone through the struggle of finding
                    my passion, but eventually found my interest for biomedical
                    engineering.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          className="w-full"
          onClick={() =>
            window.open("https://buy.stripe.com/7sIbLI9B80DS6uA9AC", "_blank")
          }
        >
          Schedule Call ($60)
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleCall;
