"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

const Quiz = () => {
  const supabase = createSupabaseBrowserClient();

  const [answers, setAnswers] = useState({
    name: "",
    placeOfWork: "",
    position: "",
  });

  const [showWelcome, setShowWelcome] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { toast } = useToast();

  const questions = [
    {
      question: "What is your name?",
      type: "text",
      key: "name",
    },
    {
      question: "Where do you work?",
      type: "text",
      key: "placeOfWork",
    },
    {
      question: "What is your position?",
      type: "text",
      key: "position",
    },
  ];

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const session = await createSupabaseBrowserClient().auth.getSession();
      const { data, error } = await supabase
        .from("users")
        .update({
          name: answers.name,
          placeOfWork: answers.placeOfWork,
          position: answers.position,
          onboarded: true
        })
        .eq("uid", session.data.session?.user.id);

      if (error) {
        console.error("Error updating user data:", error);
      } else {
        toast({
          title: "Information Submitted",
          description: "Your information has been successfully submitted.",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting information:", error);
    }
  };

  if (showWelcome) {
    return (
      <Card className="overflow-y-auto h-full p-6 bg-white rounded-lg shadow-md">
        <CardHeader className="px-4 py-6">
          <CardTitle className="text-2xl font-bold flex items-center">
            👋 Welcome!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Please answer the following questions to complete your profile.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between gap-5 items-center">
            <Button className="w-24 bg-[#004684]" onClick={() => setShowWelcome(false)}>
              Start
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <Card className="overflow-y-auto h-full p-6 bg-white rounded-lg shadow-md">
      <CardHeader className="px-4 py-6">
        <CardTitle className="text-2xl font-bold">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
        <CardDescription>
          {currentQuestionData.question}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow h-[70%] overflow-y-auto px-4">
        <Input
          autoFocus
          value={answers[currentQuestionData.key as keyof typeof answers] || ""}
          onChange={(e) => handleAnswerChange(currentQuestionData.key, e.target.value)}
          className="mt-2"
          type="text"
        />
      </CardContent>
      <CardFooter className="mt-auto px-4 py-6">
        <div className="flex justify-between gap-5 items-center">
          {currentQuestion > 0 && (
            <Button onClick={() => setCurrentQuestion((prev) => prev - 1)} variant="outline">
              Previous
            </Button>
          )}
          <Button onClick={handleNext}>
            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
