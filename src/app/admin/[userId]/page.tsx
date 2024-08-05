"use client";
// pages/admin/reviews/[userId].tsx
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { UserNav } from "@/components/UserNav";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { FaUser } from "react-icons/fa";
import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AlgoReview from "@/components/AlgoReview";

export default function ProductPage({ params }: { params: { userId: any } }) {
  const { toast } = useToast();

  const router = useRouter();
  const userId = params.userId;
  const [userData, setUserData] = useState<any>(null);
  const supabase = createSupabaseBrowserClient();
  const [selectedPerson, setSelectedPerson] = useState("");

  const [hideReviews, setHideReviews] = useState(false);

  const [userQuestions, setUserQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const fetchUserQuestions = async (userData: any) => {
    const { data: questions, error: questionError } = await supabase
      .from("user_questions")
      .select("*")
      .eq("user_id", userData.uid);

    if (questionError) {
      console.error("Error fetching user questions:", questionError);
    } else {
      setUserQuestions(questions || []);
    }
  };

  const handleSubmitAnswer = async (questionId: number) => {
    const answer = answers[questionId];
    if (answer) {
      const { data: updateData, error: updateError } = await supabase
        .from("user_questions")
        .update({
          answer: answer,
          id: questionId,
          answered_at: new Date().toISOString(),
        })
        .eq("id", questionId);

      console.log("updateData", updateData);

      if (updateError) {
        console.error("Error submitting answer:", updateError);
      } else {
        fetchUserQuestions(userData);
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionId]: "",
        }));
      }
    }
  };

  const fetchUserData = async () => {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return <div>Error fetching user data</div>;
    }

    setUserData(userData);

    fetchUserQuestions(userData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // const handleRadioChange = (event) => {
  //   setSelectedPerson(event.target.value);
  // };

  const [reviewPerson, setReviewPerson] = useState("");

  const [academicGrade, setAcademicGrade] = useState("");
  const [academicReasoning, setAcademicReasoning] = useState("");

  const [activitiesSectionCommonApp, setActivitiesSectionCommonApp] =
    useState("");

  const [extracurricularsGrade, setExtracurricularsGrade] = useState("");
  const [extracurricularsReasoning, setExtracurricularsReasoning] =
    useState("");

  const [classesGrade, setClassesGrade] = useState("");
  const [classesReasoning, setClassesReasoning] = useState("");

  const [extracurricularIdeas, setExtracurricularIdeas] = useState<string[]>(
    []
  );
  const [essayIdeas, setEssayIdeas] = useState<string[]>([]);
  const [overallComments, setOverallComments] = useState<string[]>([]);
  const [narrativeReview, setNarrativeReview] = useState<string[]>([]);

  const [spikeReview, setSpikeReview] = useState({
    spike1: {
      title: "",
      description: "",
      essayIdea: "",
      extracurricularIdea: "",
    },
    spike2: {
      title: "",
      description: "",
      essayIdea: "",
      extracurricularIdea: "",
    },
  });

  async function sendEmail(emailType: String, email: String) {
    console.log("emailing...");
    //post to /api/send
    console.log(userData.email);
    const response = await fetch(`/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailType: emailType,
        email: email,
      }),
    });
    //get the response json
    const data = await response.json();
  }

  const handleSaveReview = async () => {
    let isValidJson = true;
    let activitiesJson;

    // Check if activitiesSectionCommonApp is empty
    if (activitiesSectionCommonApp.trim() === "") {
      isValidJson = true; // Allow saving if the field is empty
    } else {
      // Try to parse the JSON
      try {
        activitiesJson = JSON.parse(activitiesSectionCommonApp);
      } catch (error) {
        isValidJson = false;
        console.error("Error parsing JSON:", error);
      }
    }

    if (isValidJson) {
      const { data: updateData, error: updateError } = await supabase
        .from("users")
        .update({
          review_person: reviewPerson,

          academic_review: {
            grade: academicGrade,
            reasoning: academicReasoning,
          },
          extracurriculars_reviews: {
            grade: extracurricularsGrade,
            reasoning: extracurricularsReasoning,
          },
          classes_reviews: {
            grade: classesGrade,
            reasoning: classesReasoning,
          },
          extracurricular_ideas: extracurricularIdeas,
          essay_ideas: essayIdeas,
          overall_comments: overallComments,
          spike_review: spikeReview,
          narrative_review: narrativeReview,
          activities_section_common_app: activitiesSectionCommonApp || null, // Use activitiesJson or null
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Error saving review:", updateError);
      } else {
        toast({
          title: "Saved data",
          description: "Review saved successfully",
        });
      }
    } else {
      toast({
        title: "Invalid JSON",
        description:
          "The activities section JSON format is invalid. Please correct it and try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitReview = async () => {
    let isValidJson = true;
    let activitiesJson;

    // Check if activitiesSectionCommonApp is empty
    if (activitiesSectionCommonApp.trim() === "") {
      isValidJson = true; // Allow submitting if the field is empty
    } else {
      // Try to parse the JSON
      try {
        activitiesJson = JSON.parse(activitiesSectionCommonApp);
      } catch (error) {
        isValidJson = false;
        console.error("Error parsing JSON:", error);
      }
    }

    if (isValidJson) {
      // Save review data
      await handleSaveReview();
      const { data: updateData, error: updateError } = await supabase
        .from("users")
        .update({
          review_completed: true,
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Error submitting review:", updateError);
      } else {
        router.push("/admin");
        toast({
          title: "Submitted review",
          description: "Review submitted successfully",
        });
      }
      //send email
      sendEmail("reviewcomplete", userData.email);
    } else {
      toast({
        title: "Invalid JSON",
        description:
          "The activities section JSON format is invalid. Please correct it and try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (userData) {
      // Load saved review data

      setReviewPerson(userData.review_person || "");
      setAcademicGrade(userData.academic_review?.grade || "");
      setAcademicReasoning(userData.academic_review?.reasoning || "");
      setExtracurricularsGrade(userData.extracurriculars_reviews?.grade || "");
      setExtracurricularsReasoning(
        userData.extracurriculars_reviews?.reasoning || ""
      );
      setClassesGrade(userData.classes_reviews?.grade || "");
      setClassesReasoning(userData.classes_reviews?.reasoning || "");
      setExtracurricularIdeas(userData.extracurricular_ideas || []);
      setEssayIdeas(userData.essay_ideas || []);
      setOverallComments(userData.overall_comments || []);
      setNarrativeReview(userData.narrative_review || []);
      setActivitiesSectionCommonApp(
        userData.activities_section_common_app || ""
      );

      setSpikeReview(
        userData.spike_review || {
          spike1: {
            title: "",
            description: "",
            essayIdea: "",
            extracurricularIdea: "",
          },
          spike2: {
            title: "",
            description: "",
            essayIdea: "",
            extracurricularIdea: "",
          },
        }
      );
    }
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const addOverallComment = () => {
    setOverallComments([...overallComments, ""]);
  };

  const removeOverallComment = (index: number) => {
    const updatedComments = [...overallComments];
    updatedComments.splice(index, 1);
    setOverallComments(updatedComments);
  };

  const updateOverallComment = (index: number, value: string) => {
    const updatedComments = [...overallComments];
    updatedComments[index] = value;
    setOverallComments(updatedComments);
  };

  return (
    <div className="flex flex-col md:flex">
      <div className="border-b">
        <UserNav />
      </div>
      <div className="lg:px-48 md:px-24 py-12 gap-5 flex flex-col">
        {" "}
        {/* Added flex-col */}
        <h1>Review Page for User: {userData.name}</h1>
        {/* go back button */}
        <Button
          onClick={() => router.push("/admin")}
          className="mt-4"
          variant="outline"
        >
          Go back
        </Button>
        <Button onClick={() => setHideReviews(!hideReviews)}>
          {hideReviews ? "Tik Tok Mode On" : "Tik Tok Mode Off"}
        </Button>
        {/* Reviewer Information */}
        <Card className="shadow-md p-6 bg-white rounded-lg ">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <FaUser className="inline-block mr-2 text-blue-500" />
              Reviewer
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          {/* <CardContent>
            <div className="mb-4 focus:ring-indigo-500 h-12 text-lg justify-between font-medium transition-all">
              <label htmlFor="reviewPerson">
                <input
                  type="radio"
                  value="Ryan"
                  checked={selectedPerson === "Ryan"}
                  onChange={(event) => {
                    handleRadioChange(event);
                    setReviewPerson("ryan");
                    console.log("event.target.value: " + event.target.value);
                  }}
                />{" "}
                Ryan
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="David"
                  checked={selectedPerson === "David"}
                  onChange={(event) => {
                    handleRadioChange(event);
                    setReviewPerson("david");
                    console.log("event.target.value: " + event.target.value);
                  }}
                />{" "}
                David
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="Dylan"
                  checked={selectedPerson === "Dylan"}
                  onChange={(event) => {
                    handleRadioChange(event);
                    console.log("event.target.value: " + event.target.value);
                    setReviewPerson("dylan");
                  }}
                />{" "}
                Dylan
              </label>
            </div>
          </CardContent> */}
        </Card>
        {/* User Information */}
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
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700">Name: {userData.name}</p>
                    <Separator className="my-2 border-gray-300" />
                    <p className="text-gray-700">Email: {userData.email}</p>
                    <Separator className="my-2 border-gray-300" />
                    <p className="text-gray-700">School: {userData.school}</p>
                    <Separator className="my-2 border-gray-300" />
                    <p className="text-gray-700">
                      Is Magnet School:{" "}
                      {userData.is_magnet_school ? "Yes" : "No"}
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
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div>GPA: {userData.gpa}</div>
                    <Separator className="my-2 border-gray-300" />

                    <div>SAT Score: {userData.sat_score}</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="classes">
                <AccordionTrigger>Classes</AccordionTrigger>
                <AccordionContent>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    {/* <ul> */}
                      {/* {userData.classes.map((class_, index) => ( */}
                        {/* <li key={index}>{class_}</li> */}
                      {/* ))} */}
                    {/* </ul> */}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="top-colleges">
                <AccordionTrigger>Top Colleges</AccordionTrigger>
                <AccordionContent>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    {/* <ul> */}
                      {/* {userData.top_colleges.map((college, index) => ( */}
                        {/* <li key={index}>{college}</li> */}
                      {/* ))} */}
                    {/* </ul> */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        {/* User Questions */}
        <Card>
          <CardHeader>
            <CardTitle>User Questions</CardTitle>
          </CardHeader>
          <CardContent>
            {userQuestions.map((question) => (
              <div key={question.id} className="mb-4">
                <p className="font-bold">Question:</p>
                <p>{question.question}</p>
                <p className="text-sm text-gray-500">
                  Asked at: {format(new Date(question.asked_at), "PPpp")}
                </p>
                {question.answer ? (
                  <div>
                    <p className="font-bold">Answer:</p>
                    <p>{question.answer}</p>
                    <p className="text-sm text-gray-500">
                      Answered at:{" "}
                      {format(new Date(question.answered_at), "PPpp")}
                    </p>
                  </div>
                ) : (
                  <div>
                    <Textarea
                      value={answers[question.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter your answer"
                    />
                    <Button
                      onClick={() => handleSubmitAnswer(question.id)}
                      className="mt-2"
                    >
                      Submit Answer
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Academic Review */}
        <Card>
          <CardHeader>
            <CardTitle>Academics</CardTitle>
            <CardDescription>
              GPA: {userData.gpa || "Not provided"}, SAT:{" "}
              {userData.sat_score || "Not provided"}{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!hideReviews && (
              <div>
                <AlgoReview
                  userData={userData}
                  prompt={"Grade the user&apos;s academics"}
                  setting="academics"
                  // onSuccess={(grade, reasoning) => {
                  //   setAcademicGrade(grade);
                  //   setAcademicReasoning(reasoning);
                  // }}
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="academicGrade"
                className="block text-sm font-medium text-gray-700"
              >
                Grade
              </label>
              <Input
                id="academicGrade"
                value={academicGrade}
                onChange={(e) => setAcademicGrade(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="academicReasoning"
                className="block text-sm font-medium text-gray-700"
              >
                Reasoning
              </label>
              <Textarea
                id="academicReasoning"
                value={academicReasoning}
                onChange={(e) => setAcademicReasoning(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows={10}
              />
            </div>
          </CardContent>
        </Card>
        {/* Extracurriculars  NEW Review */}
        {userData.version !== 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Extracurriculars</CardTitle>
            </CardHeader>
            <CardContent>
              {!hideReviews && (
                <AlgoReview
                  userData={userData}
                  prompt={"Grade the user&apos;s extracurriculars"}
                  setting="extracurriculars"
                />
              )}
              {/* {userData.extracurriculars.map((activity, index) => (
                <div className="mt-5" key={index}>
                  <p>
                    <strong>Position/Leadership:</strong> {activity.position}
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
                    <strong>Hours per Week:</strong> {activity.hoursPerWeek}
                  </p>
                  <p>
                    <strong>Weeks per Year:</strong> {activity.weeksPerYear}
                  </p>
                </div>
              ))} */}
              <div className="mb-4">
                <label
                  htmlFor="extracurricularsGrade"
                  className="block text-sm font-medium text-gray-700"
                >
                  Grade
                </label>
                <Input
                  id="extracurricularsGrade"
                  value={extracurricularsGrade}
                  onChange={(e) => setExtracurricularsGrade(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="extracurricularsReasoning"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reasoning
                </label>
                <Textarea
                  id="extracurricularsReasoning"
                  value={extracurricularsReasoning}
                  onChange={(e) => setExtracurricularsReasoning(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={10}
                />
              </div>
            </CardContent>
          </Card>
        )}
        {/* Extracurriculars Review */}
        {userData.version == 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Extracurriculars</CardTitle>
            </CardHeader>
            <CardContent>
              {!hideReviews && (
                <AlgoReview
                  userData={userData}
                  prompt={"Grade the user&apos;s extracurriculars"}
                  setting="extracurriculars"
                />
              )}

              {userData.extracurriculars.length > 0 ? (
                <ul className="list-disc pl-4 mb-4">
                  {userData.extracurriculars.map(
                    (ec: string, index: number) => (
                      <li key={index}>{ec}</li>
                    )
                  )}
                </ul>
              ) : (
                <div>No extracurriculars provided</div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="extracurricularsGrade"
                  className="block text-sm font-medium text-gray-700"
                >
                  Grade
                </label>
                <Input
                  id="extracurricularsGrade"
                  value={extracurricularsGrade}
                  onChange={(e) => setExtracurricularsGrade(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="extracurricularsReasoning"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reasoning
                </label>
                <Textarea
                  id="extracurricularsReasoning"
                  value={extracurricularsReasoning}
                  onChange={(e) => setExtracurricularsReasoning(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={10}
                />
              </div>
            </CardContent>
          </Card>
        )}
        {/* Classes Review */}
        <Card>
          <CardHeader>
            <CardTitle>Intellectual Curiousity </CardTitle>
            <CardDescription>
              Out-Of-School Activities, Research, Summer Programs, Hooks and
              Uniqueness
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!hideReviews && (
              <AlgoReview
                userData={userData}
                prompt={
                  "Grade the user&apos;s Intellectual Curiousity such a sOut-Of-School Activities, Research, Summer Programs, Hooks and Uniqueness"
                }
                setting="intellectual"
              />
            )}

            {userData.classes.length > 0 ? (
              <ul className="list-disc pl-4 mb-4">
                {userData.classes.map((class_: string, index: number) => (
                  <li key={index}>{class_}</li>
                ))}
              </ul>
            ) : (
              <div>No classes provided</div>
            )}
            <div className="mb-4">
              <label
                htmlFor="classesGrade"
                className="block text-sm font-medium text-gray-700"
              >
                Grade
              </label>
              <Input
                id="classesGrade"
                value={classesGrade}
                onChange={(e) => setClassesGrade(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="classesReasoning"
                className="block text-sm font-medium text-gray-700"
              >
                Reasoning
              </label>
              <Textarea
                id="classesReasoning"
                value={classesReasoning}
                onChange={(e) => setClassesReasoning(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows={10}
              />
            </div>
          </CardContent>
        </Card>
        {/* Overall Comments */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Comments</CardTitle>
          </CardHeader>
          <CardContent>
            {!hideReviews && (
              <AlgoReview
                userData={userData}
                prompt={
                  "Create a short paragraph of overall comments for the student without any specific grades."
                }
                setting="comments"
              />
            )}
            {overallComments.map((comment, index) => (
              <div key={index} className="mb-4">
                <Textarea
                  value={comment}
                  onChange={(e) => updateOverallComment(index, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={10}
                />
                <Button
                  onClick={() => removeOverallComment(index)}
                  className="mt-2"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={addOverallComment}>Add Comment</Button>
          </CardContent>
        </Card>
        {/* Narrative Review */}
        <Card>
          <CardHeader>
            <CardTitle>Narrative Review</CardTitle>
            <CardDescription>
              {" "}
              Users plan is <b>{userData.plan}</b>, only complete if it says pro{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!hideReviews && (
              <AlgoReview
                userData={userData}
                prompt={
                  "Create a narrative review for the student, focusing on their story and how it can be used in their application."
                }
                setting="narrative"
              />
            )}
            <Textarea
              value={narrativeReview}
              // onChange={(e) => setNarrativeReview(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows={10}
            />
          </CardContent>
        </Card>
        {/* Spike Review */}
        <Card>
          <CardHeader>
            <CardTitle>Spike Review</CardTitle>
            <CardDescription>
              {" "}
              Users plan is <b>{userData.plan}</b>, only complete if it says pro{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!hideReviews && (
              <AlgoReview
                userData={userData}
                prompt={
                  "Create a spike review for the student, focusing on their spikes and how they can be used in their application. You should provide a title, description, essay idea, and extracurricular idea for each spike."
                }
                setting="spike"
              />
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Spike #1
              </label>
              <Input
                value={spikeReview.spike1.title}
                onChange={(e) =>
                  setSpikeReview({
                    ...spikeReview,
                    spike1: {
                      ...spikeReview.spike1,
                      title: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Spike #1 Title"
              />
              <Textarea
                value={spikeReview.spike1.description}
                onChange={(e) =>
                  setSpikeReview({
                    ...spikeReview,
                    spike1: {
                      ...spikeReview.spike1,
                      description: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Spike #1 Description"
                rows={10}
              />
              <Textarea
                value={spikeReview.spike1.essayIdea}
                onChange={(e) =>
                  setSpikeReview({
                    ...spikeReview,
                    spike1: {
                      ...spikeReview.spike1,
                      essayIdea: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Spike #1 Essay Idea"
                rows={10}
              />
              <Textarea
                value={spikeReview.spike1.extracurricularIdea}
                onChange={(e) =>
                  setSpikeReview({
                    ...spikeReview,
                    spike1: {
                      ...spikeReview.spike1,
                      extracurricularIdea: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="spike #1 Extracurricular Idea"
                rows={10}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Spike #2
              </label>
              {!hideReviews && (
                <AlgoReview
                  userData={userData}
                  prompt={
                    "Create a spike review for the student, focusing on their spikes and how they can be used in their application. You should provide a title, description, essay idea, and extracurricular idea for each spike."
                  }
                  setting="spike"
                />
              )}

              <Input
                value={spikeReview.spike2.title}
                onChange={(e) =>
                  setSpikeReview({
                    ...spikeReview,
                    spike2: {
                      ...spikeReview.spike2,
                      title: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Spike #2 Title"
              />
              <Textarea
                value={spikeReview.spike2.description}
                onChange={(e) =>
                  setSpikeReview({
                    ...spikeReview,
                    spike2: {
                      ...spikeReview.spike2,
                      description: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Spike #2 Description"
              />
              <Textarea
                value={spikeReview.spike2.essayIdea}
                onChange={(e) =>
                  setSpikeReview({
                    ...spikeReview,
                    spike2: {
                      ...spikeReview.spike2,
                      essayIdea: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Spike #2 Essay Idea"
                rows={10}
              />
              <Textarea
                value={spikeReview.spike2.extracurricularIdea}
                onChange={(e) =>
                  setSpikeReview({
                    ...spikeReview,
                    spike2: {
                      ...spikeReview.spike2,
                      extracurricularIdea: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Spike #2 Extracurricular Idea"
                rows={10}
              />
            </div>
          </CardContent>
        </Card>
        {/* Activities Section (Common App) */}
        <Card>
          <CardHeader>
            <CardTitle>Activities Section (Common App)</CardTitle>
            <CardDescription>
              {" "}
              Users version is <b>{userData.version}</b>, only complete if it
              says 2{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlgoReview
              userData={userData}
              prompt="Create activity section."
              setting="activites"
            />
            <Textarea
              value={activitiesSectionCommonApp}
              onChange={(e) => setActivitiesSectionCommonApp(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows={10}
              placeholder="Enter your activities section for the Common App in Json Format"
            />
          </CardContent>
        </Card>
        <div>
          {/* Save Review Button */}
          <Button
            variant={"secondary"}
            onClick={handleSaveReview}
            className="mt-4 mx-2"
          >
            Save Review
          </Button>
          {/* Submit Review Button */}
          <Button onClick={handleSubmitReview} className="mt-4">
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
