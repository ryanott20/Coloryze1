"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { FaHandshake } from "react-icons/fa";
const Quiz = () => {
  const supabase = createSupabaseBrowserClient();

  interface Extracurricular {
    position: string;
    organization: string;
    description: string;
    gradeLevels: string;
    timing: string;
    hoursPerWeek: string;
    weeksPerYear: string;
  }

  const [UserData, setUserData] = useState({
    name: "",
    email: "",
    school: "",
    isMagnetSchool: "",
    testType: "",
    graduationYear: "",
    gpa: "",
    satScore: "",
    extracurriculars: [] as Extracurricular[],
    classes: [" "],
    topColleges: [" "],
    numApsTaken: " ",
    hooks: "",
    major: "",
    plan: "",
  });
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    name: "",
    email: "",
    school: "",
    isMagnetSchool: "",
    testType: "",
    graduationYear: "",
    gpa: "",
    satScore: "",
    extracurriculars: [] as Extracurricular[],
    classes: [" "],
    topColleges: [" "],
    numApsTaken: " ",
    hooks: "",
    major: "",
    additionalInfo: "",
  });

  //check if the user has already completed the quiz
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = await createSupabaseBrowserClient().auth.getSession();
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("uid", session.data.session?.user.id);

        setUserData(data[0]);

        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          if (data[0].answered_questions) {
            //populate the answers with the user's data
            setAnswers((prevAnswers) => ({
              ...prevAnswers,
              name: data[0].name,
              email: data[0].email,
              school: data[0].school,
              isMagnetSchool: data[0].is_magnet_school ? "Yes" : "No",
              testType: data[0].test_type,
              graduationYear: data[0].graduation_year,
              gpa: data[0].gpa,
              satScore: data[0].sat_score,
              extracurriculars: data[0].extracurriculars as Extracurricular[],
              classes: data[0].classes,
              topColleges: data[0].top_colleges,
              numApsTaken: data[0].num_aps_taken,
              hooks: data[0].hooks,
              major: data[0].major,
              additionalInfo: data[0].additional_info,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  async function sendEmail(emailType: String, email: String) {
    console.log("emailing...");
    //post to /api/send
    console.log(UserData.email);
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
    console.log(data);
  }

  const [showToast, setShowToast] = useState(false);
  const [showEmailToast, setShowEmailToast] = useState(false); // Add this line

  const { toast } = useToast();

  const questions = [
    {
      question: "What is your name? (optional)",
      type: "text",
      key: "name",
    },
    {
      question: "What is your email?",
      description: "Jeffery@gmail.com",
      type: "text",
      key: "email",
    },

    {
      question: "What major are you planning to do?",
      description: "Computer Science, Undecided",
      type: "text",
      key: "major",
    },
    {
      question: "What are your dream colleges?",
      type: "college",
      description: "Stanford, MIT, Harvard",
      key: "topColleges",
    },
    {
      question: "What is the name of the school you currently attend?",
      description:
        "Thomas Jefferson High School. If you attend multiple schools, just write your most competitive/relevant school",
      type: "text",
      key: "school",
    },
    {
      question: "Is it a magnet school?",
      type: "radio",
      options: ["Yes", "No"],
      key: "isMagnetSchool",
    },
    {
      question: "What year are you graduating?",
      description: "2024",
      type: "text",
      key: "graduationYear",
    },
    {
      question:
        "What is your GPA and class rank/size? If you don't know, estimate to the best of your ability.",
      description: "Unweighted 3.85/4.00, Weighted 4.51/5.00, Rank 10/300",
      type: "text",
      key: "gpa",
    },
    {
      question:
        "Did you take the SAT or ACT? If you took both, select the one you scored higher on.",
      type: "radio",
      options: ["No", "SAT", "ACT"],
      key: "testType",
    },
    {
      question: "What is your test superscore?",
      description:
        "1500, 34. If you haven't taken the SAT or ACT, just write 0.",
      type: "text",
      key: "satScore",
    },
    {
      question:
        "List your extracurriculars. Include leadership positions and awards/impact. (Max 10)",
      description:
        "Team Captain, Vex Robotics, Led robotics volunteering and placed 5th States, Summer 2023 to Fall 2024",
      type: "extracurricular",
      key: "extracurriculars",
    },
    {
      question:
        "What are your hooks? This includes coming from an underrepresented background, college legacies or unusual talents. (optional)",
      description: "I am a low-income, first-generation student",
      type: "text",
      key: "hooks",
    },
    // {
    //   question: "List your AP courses",
    //   description: "AP Calculus AB",
    //   type: "course",
    //   key: "apCourses",
    // },
    {
      question: "List your most revelant classes (Max 10)",
      description: "Grade 11, English DE, A+",
      type: "class",
      key: "classes",
    },
    {
      question:
        "Please provide us with any additional information you think would be helpful. This includes any personal background you would like us to take note of for your essays.",
      description: "I was unable to take Spanish IV due to COVID",
      type: "text",
      key: "additionalInfo",
    },
    // {
    //   question: "How many AP courses have you taken?",
    //   description: "5",
    //   type: "text",
    //   key: "numApsTaken",
    // },
  ];

  const handleEnterKeyPress = (event, key) => {
    if (event.keyCode === 13) {
      console.log(`User pressed Enter while typing in the ${key} field`);
      handleNext();
    }
  };

  const validateInput = (key, value) => {
    switch (key) {
      case "graduationYear":
        // Allow only numeric values for graduation year
        return /^\d+$/.test(value);
      // case "gpa":
      //   // Allow decimal values for GPA
      //   return /^\d*\.?\d*$/.test(value);
      case "satScore":
      case "numApsTaken":
        // Allow only numeric values for SAT score and number of AP courses
        return /^\d+$/.test(value);
      default:
        return true;
    }
  };

  const handleAnswerChange = (key, value) => {
    if (validateInput(key, value)) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [key]: value,
      }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNext = () => {
    const currentQuestionData = questions[currentQuestion];
    const currentAnswer = answers[currentQuestionData.key];
    //if the user is on the last question, submit the form
    if (currentQuestion === questions.length - 1) {
      handleSubmit();
      return;
    }

    // Skip validation for the "name" and "hooks" fields
    if (
      currentQuestionData.key === "name" ||
      currentQuestionData.key === "hooks" ||
      currentQuestionData.key === "additionalInfo"
    ) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else if (currentQuestionData.key === "email") {
      // Check for "@" symbol and valid email format for the email input
      if (currentAnswer.includes("@") && validateEmail(currentAnswer)) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setShowEmailToast(false); // Reset showEmailToast to false
      } else {
        // Show custom toast for incorrect email format
        setShowEmailToast(true); // Set showEmailToast to true for invalid email
      }
    } else if (currentQuestionData.key === "graduationYear") {
      // Check if the graduation year is within the allowed range
      if (validateInput(currentQuestionData.key, currentAnswer)) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setShowToast(false); // Reset showToast to false
      } else {
        // Show toast for invalid graduation year
        setShowToast(true);
      }
    } else {
      // For other inputs, perform the existing validation
      if (
        currentAnswer !== undefined &&
        currentAnswer !== null &&
        currentAnswer !== "" &&
        (currentAnswer.constructor !== Array || currentAnswer.length > 0)
      ) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setShowToast(false); // Reset showToast to false
      } else {
        // Show toast for required answer
        setShowToast(true);
        setShowEmailToast(false); // Reset showEmailToast to false
      }
    }
  };

  // Add a state to manage the toast visibility
  // Call useToast at the top level of the component

  useEffect(() => {
    if (showToast) {
      // Show toast for missing answer
      toast({
        title: "Missing Answer",
        description: "Please provide an answer before proceeding.",
        variant: "destructive",
      });

      // Reset showToast to false after showing the toast
      setShowToast(false);
    } else if (showEmailToast) {
      // Show toast for invalid email
      toast({
        title: "Invalid Email",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });

      // Reset showEmailToast to false after showing the toast
      setShowEmailToast(false);
    }
  }, [showToast, showEmailToast, toast]);
  // Rest of your component remains the same

  const handlePrevious = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleSubmit = async () => {
    try {
      const session = await createSupabaseBrowserClient().auth.getSession();

      // Validate and format the input values
      const graduationYear = answers.graduationYear
        ? parseInt(answers.graduationYear, 10)
        : null;
      const gpa = answers.gpa;
      const satScore = answers.satScore;
      const numApsTaken = answers.numApsTaken
        ? parseInt(answers.numApsTaken, 10)
        : null;

      // Remove empty strings from arrays

      const extracurriculars = answers.extracurriculars;
      const classes = answers.classes.filter((item) => item.trim() !== "");
      const topColleges = answers.topColleges.filter(
        (item) => item.trim() !== ""
      );

      //check if the user is on a free

      const { data, error } = await supabase
        .from("users")
        .update({
          school: answers.school,
          is_magnet_school: answers.isMagnetSchool === "Yes",
          test_type: answers.testType,
          graduation_year: graduationYear,
          gpa: gpa,
          sat_score: satScore,
          extracurriculars: extracurriculars,
          classes: classes,
          top_colleges: topColleges,
          num_aps_taken: numApsTaken,
          onboarded: true,
          review_completed: false,
          hooks: answers.hooks,
          additional_info: answers.additionalInfo,
          major: answers.major,
        })
        .eq("uid", session.data.session?.user.id);

      //if the user has a pro or basic plan, send an email
      if (UserData.plan === "pro" || UserData.plan === "basic") {
        //only send 1 email

        //sendEmail("reviewsubmit", UserData.email);

        const { data, error } = await supabase
          .from("users")
          .update({
            school: answers.school,
            is_magnet_school: answers.isMagnetSchool === "Yes",
            test_type: answers.testType,
            graduation_year: graduationYear,
            gpa: gpa,
            sat_score: satScore,
            extracurriculars: extracurriculars,
            classes: classes,
            top_colleges: topColleges,
            num_aps_taken: numApsTaken,
            onboarded: true,
            review_completed: false,
            answered_questions: true,
            hooks: answers.hooks,
            additional_info: answers.additionalInfo,
            major: answers.major,
            due_date: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
          })
          .eq("uid", session.data.session?.user.id);
      }

      if (error) {
        console.error("Error updating user data:", error);
      } else {
        // Perform any additional actions after successful update

        //refresh the page
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const addItem = (key) => {
    if (answers[key].length < 10) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [key]: [...prevAnswers[key], ""],
      }));
    }
  };

  // Update the relevant functions
  const addExtracurricular = () => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      extracurriculars: [
        ...prevAnswers.extracurriculars,
        {
          position: "",
          organization: "",
          description: "",
          gradeLevels: "",
          timing: "",
          hoursPerWeek: "",
          weeksPerYear: "",
        },
      ],
    }));
  };

  const removeExtracurricular = (index) => {
    setAnswers((prevAnswers) => {
      const updatedExtracurriculars = [...prevAnswers.extracurriculars];
      updatedExtracurriculars.splice(index, 1);
      return {
        ...prevAnswers,
        extracurriculars: updatedExtracurriculars,
      };
    });
  };

  const updateExtracurricular = (index, field, value) => {
    setAnswers((prevAnswers) => {
      const updatedExtracurriculars = [...prevAnswers.extracurriculars];
      updatedExtracurriculars[index][field] = value;
      return {
        ...prevAnswers,
        extracurriculars: updatedExtracurriculars,
      };
    });
  };

  const removeItem = (key, index) => {
    setAnswers((prevAnswers) => {
      const updatedItems = [...prevAnswers[key]];
      updatedItems.splice(index, 1);
      return {
        ...prevAnswers,
        [key]: updatedItems,
      };
    });
  };

  const updateItem = (key, index, value) => {
    setAnswers((prevAnswers) => {
      const updatedItems = [...prevAnswers[key]];
      updatedItems[index] = value;
      return {
        ...prevAnswers,
        [key]: updatedItems,
      };
    });
  };

  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showWelcome) {
    return (
      <Card className="overflow-y-auto h-full p-6 bg-white rounded-lg shadow-md">
        <CardHeader className="px-4 py-6">
          <CardTitle className="text-2xl font-bold flex items-center">
            👋 We&apos;re excited to have you onboard!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Please answer the following questions to create your profile. This
            information will be used to provide you with personalized college
            application advice.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between gap-5 items-center">
            <Button
              className="w-24 bg-[#004684]"
              onClick={() => setShowWelcome(false)}
            >
              Start
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="overflow-y-auto h-full p-6 bg-white rounded-lg shadow-md">
      <CardHeader className="px-4 py-6">
        <CardTitle className="text-2xl font-bold">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
        <CardDescription>
          Please answer the following questions to create your profile. Although this is informal, please answer them as you would your college applications.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow h-[70%] overflow-y-auto px-4">
        <div className="mb-4">
          <Label className="text-lg font-semibold">
            {currentQuestionData.question}
          </Label>
          {currentQuestionData.description && (
            <span className="text-sm text-gray-500">
              <br />
              Example: {currentQuestionData.description}
            </span>
          )}
          {currentQuestionData.type === "text" && (
            <Input
              autoFocus
              value={answers[currentQuestionData.key] || ""}
              onChange={(e) =>
                handleAnswerChange(currentQuestionData.key, e.target.value)
              }
              onKeyDown={(e) => handleEnterKeyPress(e, currentQuestionData.key)}
              className="mt-2"
              type={
                currentQuestionData.key === "graduationYear" ||
                currentQuestionData.key === "satScore" ||
                currentQuestionData.key === "numApsTaken"
                  ? "number"
                  : "text"
              }
              min={0}
            />
          )}
          {currentQuestionData.type === "radio" && (
            <RadioGroup
              value={answers[currentQuestionData.key] || ""}
              onValueChange={(value) =>
                handleAnswerChange(currentQuestionData.key, value)
              }
              className="mt-2"
            >
              {currentQuestionData.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {currentQuestionData.type === "extracurricular" && (
            <>
              {answers.extracurriculars.map((activity, index) => (
                <div className="my-3" key={index}>
                  <div className="mb-2 text-lg font-semibold">
                    Extracurricular {index + 1}{" "}
                  </div>
                  <Input
                    value={activity.position}
                    className="mb-3"
                    onChange={(e) =>
                      updateExtracurricular(index, "position", e.target.value)
                    }
                    placeholder="Position/Leadership description "
                    maxLength={50}
                  />
                  <Input
                    value={activity.organization}
                    className="mb-3"
                    onChange={(e) =>
                      updateExtracurricular(
                        index,
                        "organization",
                        e.target.value
                      )
                    }
                    placeholder="Organization Name "
                    maxLength={100}
                  />
                  <Textarea
                    value={activity.description}
                    className="mb-3"
                    onChange={(e) =>
                      updateExtracurricular(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Please describe this activity, including what you accomplished and any recognition you received, etc."
                    maxLength={150}
                  />
                  <Input
                    value={activity.gradeLevels}
                    className="mb-3"
                    onChange={(e) =>
                      updateExtracurricular(
                        index,
                        "gradeLevels",
                        e.target.value
                      )
                    }
                    placeholder="Participation grade levels (9-12) (optional)"
                  />
                  <Input
                    value={activity.timing}
                    className="mb-3"
                    onChange={(e) =>
                      updateExtracurricular(index, "timing", e.target.value)
                    }
                    placeholder="Timing of participation (optional)"
                  />
                  <Input
                    type="number"
                    value={activity.hoursPerWeek}
                    className="mb-3"
                    onChange={(e) =>
                      updateExtracurricular(
                        index,
                        "hoursPerWeek",
                        e.target.value
                      )
                    }
                    placeholder="Hours spent per week (optional)"
                  />
                  <Input
                    type="number"
                    value={activity.weeksPerYear}
                    onChange={(e) =>
                      updateExtracurricular(
                        index,
                        "weeksPerYear",
                        e.target.value
                      )
                    }
                    placeholder="Weeks spent per year (optional)"
                  />
                  {answers.extracurriculars.length > 1 && (
                    <Button
                      onClick={() => removeExtracurricular(index)}
                      variant="outline"
                      size="sm"
                      className="mt-1.5"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <br/>
              <Button onClick={addExtracurricular} className="mt-2">
                Add Extracurricular
              </Button>
            </>
          )}

          {["class", "course", "college"].includes(
            currentQuestionData.type
          ) && (
            <>
              {answers[currentQuestionData.key].map((item, index) => (
                <div
                  key={index}
                  className="mb-2 flex flex-auto gap-4 align-middle"
                >
                  <Input
                    autoFocus
                    value={item}
                    onChange={(e) =>
                      updateItem(currentQuestionData.key, index, e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleEnterKeyPress(e, currentQuestionData.key)
                    }
                    className="mt-1"
                  />
                  {answers[currentQuestionData.key].length > 1 && (
                    <Button
                      onClick={() => removeItem(currentQuestionData.key, index)}
                      variant="outline"
                      size="sm"
                      className="mt-1.5"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {answers[currentQuestionData.key].length < 10 && (
                <Button
                  onClick={() => addItem(currentQuestionData.key)}
                  className="mt-2"
                >
                  Add {currentQuestionData.type}
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto px-4 py-6">
        <div className="flex justify-between gap-5 items-center">
          <div className="flex gap-5">
            {currentQuestion === questions.length - 1 ? (
              <AlertDialog>
                <AlertDialogTrigger>
                  {" "}
                  <Button variant="default">Submit Information</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please make sure all the information is correct before
                      submitting because the timer for review will start as soon
                      as you submit.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button className="w-24 bg-[#004684]" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentQuestion > 0 && (
              <Button
                className="w-24"
                onClick={handlePrevious}
                variant="outline"
              >
                Previous
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
      <div className="mx-4 mb-4">
        <Progress value={progress} className="mb-4" />
      </div>
    </Card>
  );
};

export default Quiz;
