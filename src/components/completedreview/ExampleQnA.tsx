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
  const userData = {
    id: 147,
    uid: "43d098ff-c7f3-40ab-855d-f1d905c31dcd",
    name: "Founders",
    email: "founders@ivyfy.me",
    school: "Thomas Jefferson High School",
    is_magnet_school: true,
    gpa: "Unweighted 3.85/4.00, Weighted 4.51/5.00, Rank 10/300",
    academic_review: {
      grade: "B",
      reasoning:
        "With a SAT score of 1590, salutatorian in a class of 350 and an incredibly rigorous course load in TJHSST, you have an incredibly strong academic background. You are easily in the top 1% and an obvious A+. You are in a golden spot academically speaking for any competitive college, continue the good work anly, you need to identify your passion and focus on extracurriculars within it.\nIf you can show strength and commitment in a singular topic, you could have an easy A in your extracurricular category.",
    },
    sat_score: "1500",
    sat_review: null,
    extracurriculars: [
      " EcoTiles - Non Profit, Founder, Spring 2022 to Fall 2024, raised over $1,200 to repurposed 110+ lbs of textile waste into clothes and other products",
      "Vex Robotics, Team Captain, Summer 2023 to Fall 2024, led team to create the SkullKrusher and placed 3rd in States competition",
      "Communications Club, Treasurer, Fall 2022 to Fall 2024, accounted for member dues and organized meetings",
      "Pearson-Specter, Intern, Summer 2023 to Fall 2023, interned under Louis Litt and learned ins-and-outs of the Corporate Law",
      "Independent Biology Research, Scientist, Summer 2024 to Fall 2024, determined the effects of pH on a bioinoculant formula using PGPR, published in a HS student journal",
    ],
    extracurriculars_reviews: {
      grade: "B",
      reasoning:
        "Every single extracurricular listed is impressive. Both the leadership in your nonprofit and clubs, in addition with your initiative taken with your research, shows that you have what it takes to thrive at a top school. However, you are missing a connection between your extracurriculars. When I read your extracurriculars, I see an interest in 5 separate topics: environmental issues, robotics, communications, biology, and law. For that reason, I am giving you a B+. Within the year you have until you apply try to get some more extracurriculars that align with eachother.\n",
    },
    ap_courses_review: null,
    classes: [
      " Grade 11, English DE, A+",
      "Grade 12, AP Calc BC, A",
      "Grade 10, AP World, B+",
      "Grade 9, AP Human Geo, A+",
    ],
    classes_reviews: {
      grade: "A",
      reasoning:
        "It's clear you put in the effort and are a high-achieving student within and beyond the classroom. Your nonprofit specifically is very impressive, and I like how you have already made a tangible impact through it. Furthermore, your research done is impressive, although a high school student journal is not seen as incredibly impressive through the eyes of a college admissions officer. If you decide to do future research, try to strive to publish in a journal that is not student focused. Lastly, your internship at Pearson-Specter is very impressive, although it feels a little out of place. Your recent work has been very STEM-centric, and although the internship is definitely something to brag about in your college application, it may not end up playing a central role when building your spike. Overall, I rated your IC an A- due to several very strong out of school projects that show you are truly passionate about making change.",
    },
    top_colleges: [" Harvard", "Stanford", "UC Berkeley", "CMU"],
    num_aps_taken: null,
    onboarded: true,
    graduation_year: 2024,
    due_date: "2024-03-29T23:30:07.232Z",
    review_completed: true,
    essay_ideas: [],
    extracurricular_ideas: [],
    overall_comments: [
      "You are definitely competitive compared to other applicants for the Ivy's and T20's. However, your admission is not guaranteed. If you can use the time you have remaining to effectively tie together your extracurriculars behind one topic, you would be in great shape and have an extremely high chance of making it into a top school. Additionally, your essays need to be well-made. I recommend that you start drafting early—around May—to ensure you have enough time to write quality work. Besides that, keep up the amazing work!d keep up your grades as you continue to develop your college application.",
    ],
    test_type: "SAT",
    plan: "pro",
    spike_review: {
      spike1: {
        title: "Environmental Science & Policy ",
        essayIdea:
          "Illustrate your journey from leading a robotics team to envisioning sustainable solutions, showcasing your passion for environmental conservation through technological innovation",
        description:
          "This field covers not only the scientific aspects necessary for understanding and addressing environmental challenges but also incorporates the political and ethical dimensions required to implement the solutions. For your application, I recommend that you claim interest in using your technological background to create a solution in this field. You could write about this in your essays or start an extracurricular doing so now. Your application can then present a cohesive and compelling story of a young innovator ready to leverage technology within Environmental Science.",
        extracurricularIdea:
          "Use your robotics experience to lead a team to create a robot that can plant a variety of seeds based on the environment it's deployed in. The robot should scan terrain to find an optimal spot where it can plant the seeds. Each seed could be enclosed in a pod that contains nutrients to give the seed the ability to grow. Once the robot finds a viable location, it should plant the seeds and remain there to water them with a built-in water tank. The impact of this robot could be worldwide, and could be used to automate much of the hard work that farmers do on a day to day basis.",
      },
      spike2: {
        title: "Biotechnology",
        essayIdea:
          "Highlight your journey from founding a nonprofit focused on sustainability to conducting groundbreaking research, showcasing your dedication to merging biotechnology with environmental conservation.",
        description:
          "You could combine your diverse interests towards creating solutions in this field. Your journey in EcoTiles and Vex Robotics shows a blend of engineering and a commitment to sustainability. These experiences, combined with your hands-on research, shows your aptitude in biological and technological problems in the real world. ",
        extracurricularIdea:
          "Design, build, and implement an Aquaponics System for your school or community. You could do it individually or recruit some of your friends to help. Aquaponics combines aquaculture (raising aquatic animals) with hydroponics (cultivating plants in water) in a symbiotic environment. Your system could involve creating tanks for fish (like tilapia or trout) whose waste provides nutrients for hydroponically-grown plants (such as lettuce or herbs).",
      },
    },
    narrative_review:
      "Your narrative should emphasize your relentless curiosity and resilience, weaving together your journey from robotics to sustainable solutions, showcasing how your technological aspect and environmental commitment are driven by a constant quest for knowledge and a determination to address global challenges. Show the theme of curiosity and resilience in your essays and as an overarching theme overall.",
    answered_questions: true,
    admin: true,
    hooks: " I am a first-generation college student with a twin",
    major: "Computer Science",
    additional_info: "I was unable to take Spanish IV due to COVID",
    total_questions: 3,
  };
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
      const { data: questionData, error: questionError } = await supabase
        .from("user_questions")
        .select("*")
        .eq("user_id", session.data.session.user.id);

      if (questionError) {
        console.error("Error fetching questions and answers:", questionError);
      } else {
        setQuestionsAnswers(questionData as QuestionAnswer[]);
        setRemainingQuestions(
          userData.total_questions - (questionData || []).length
        );
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
            // type="textarea"
            placeholder="Enter your question"
            value={newQuestion}
            // onChange={handleNewQuestionChange}
          />
          <Button className="mt-2" disabled={true}>
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
