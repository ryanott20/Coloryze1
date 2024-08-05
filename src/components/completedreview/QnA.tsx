"use client";
// components/QnA.tsx
import React, { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaComments } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";

interface QuestionAnswer {
  id: number;
  user_id: string;
  question: string;
  answer: string;
  asked_at: string;
  answered_at: string;
}

interface User {
  id: string;
  total_questions: number;
}

const QnA: React.FC = () => {
  const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>(
    []
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [remainingQuestions, setRemainingQuestions] = useState(0);

  useEffect(() => {
    fetchQuestionsAnswers();
  }, []);

  const fetchQuestionsAnswers = async () => {
    const supabase = createSupabaseBrowserClient();
    const session = await supabase.auth.getSession();

    if (session.data.session) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("total_questions")
        .eq("uid", session.data.session.user.id)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError);
      } else {
        const { data: questionData, error: questionError } = await supabase
          .from("user_questions")
          .select("*")
          .eq("user_id", session.data.session.user.id);

        if (questionError) {
          console.error("Error fetching questions and answers:", questionError);
        } else {
          setQuestionsAnswers(questionData as QuestionAnswer[]);
          setRemainingQuestions(
            (userData as User).total_questions - (questionData || []).length
          );
        }
      }
    }
  };

  const handleNewQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(e.target.value);
  };

  const handleCreateQuestion = async () => {
    if (newQuestion.trim() !== "") {
      const supabase = createSupabaseBrowserClient();
      const session = await supabase.auth.getSession();

      if (session.data.session) {
        const { data, error } = await supabase.from("user_questions").insert({
          user_id: session.data.session.user.id,
          question: newQuestion,
          asked_at: new Date().toISOString(),
        });

        if (error) {
          console.error("Error creating question:", error);
        } else {
          setNewQuestion("");
          fetchQuestionsAnswers();
        }
      }
    }
  };

  return (
    <Card className="p-6 bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <FaComments className="inline-block mr-2 text-blue-500" />
          Q&A
        </CardTitle>
        <CardDescription>
          Your questions and answers. Remaining questions: {remainingQuestions}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Textarea
            type="textarea"
            placeholder="Enter your question"
            value={newQuestion}
            onChange={handleNewQuestionChange}
          />
          <Button
            className="mt-2"
            onClick={handleCreateQuestion}
            disabled={remainingQuestions === 0}
          >
            Ask Question
          </Button>
        </div>
        <Accordion type="multiple">
          {questionsAnswers.map((qa, index) => (
            <AccordionItem key={qa.id} value={`qa-${qa.id}`}>
              <AccordionTrigger>Question {index + 1}</AccordionTrigger>
              <AccordionContent>
                <div>
                  <b>Question:</b> {qa.question}
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Asked on: {format(new Date(qa.asked_at), "PPpp")}
                </p>
                <div>
                  <b>Answer:</b>{" "}
                  {qa.answer ? (
                    <>
                      {qa.answer}
                      <p className="text-sm text-gray-500 mb-2">
                        Answered on: {format(new Date(qa.answered_at), "PPpp")}
                      </p>
                    </>
                  ) : (
                    <span className="text-gray-500">Pending</span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default QnA;
