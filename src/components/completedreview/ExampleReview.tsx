// components/CompletedReview.tsx
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
  FaComments,
  FaPenFancy,
  FaRegNewspaper,
  FaPaperclip,
  FaCheck,
  FaPersonBooth,
  FaGlobe,
} from "react-icons/fa";
import UserInformation from "../UserInformation";
import ContactUs from "./ContactUs";
import ExportToPDFButton from "../pdf/ExportToPDFButton";
import { Button } from "../ui/button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import QnA from "./QnA";
import ExampleQnA from "./ExampleQnA";
import ActivitiesSection from "./ActivitiesSection";

const ExampleReview: React.FC<{}> = ({}) => {
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
    activities_section_common_app: [
      {
        positionLeadership: "Founder",
        organizationName: "EcoTiles Non-Profit",
        description:
          "Raised $1,200, repurposed 110+ lbs textile waste into sustainable products",
        participationGradeLevels: "10, 11, 12",
        timingOfParticipation: "School Year",
        hoursPerWeek: "5",
        weeksPerYear: "40",
      },
      {
        positionLeadership: "Team Captain",
        organizationName: "Vex Robotics Team",
        description: "Designed 'SkullKrusher' robot; 3rd at States",
        participationGradeLevels: "11, 12",
        timingOfParticipation: "School Year & Summer",
        hoursPerWeek: "6",
        weeksPerYear: "30",
      },
      {
        positionLeadership: "Treasurer",
        organizationName: "Communications Club",
        description: "Managed dues, organized meetings, enhanced coordination",
        participationGradeLevels: "11, 12",
        timingOfParticipation: "School Year",
        hoursPerWeek: "2",
        weeksPerYear: "36",
      },
      {
        positionLeadership: "Intern",
        organizationName: "Pearson-Specter Law Firm",
        description: "Learned corporate law intricacies under Louis Litt",
        participationGradeLevels: "11",
        timingOfParticipation: "Summer",
        hoursPerWeek: "10",
        weeksPerYear: "10",
      },
      {
        positionLeadership: "Research Scientist",
        organizationName: "Independent Biology Research",
        description:
          "Researched bioinoculant pH effects, published in student journal",
        participationGradeLevels: "11, 12",
        timingOfParticipation: "Summer & School Year",
        hoursPerWeek: "5",
        weeksPerYear: "15",
      },
    ],
    total_questions: 3,
  };

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

  //("userData", userData);
  //console.log(userData.academic_review);
  if (userData.plan === "basic") {
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
              {" "}
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
                    <AccordionTrigger>
                      Intellectual Exploration
                    </AccordionTrigger>
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

          <ContactUs />
        </div>

        <div className="space-y-8">
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
                <FaComments className="inline-block mr-2 text-green-800" />
                Overall Comments
              </CardTitle>
              <CardDescription>
                General comments about your whole application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                {userData.overall_comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <UserInformation userData={userData} />

          {/* Removed Narrative, Spikes, and Extracurricular Suggestions */}
        </div>
      </div>
    );
  }

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
        {userData.plan !== "basic" && <ExampleQnA />}
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
                  <div className="list-disc pl-6 text-gray-700 leading-relaxed">
                    {Array.isArray(userData.narrative_review) ? (
                      userData.narrative_review.map((comment, index) => (
                        <div key={index}>{comment}</div>
                      ))
                    ) : (
                      <div>{userData.narrative_review}</div>
                    )}
                  </div>
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

        <ActivitiesSection userData={userData} />

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
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              {userData.overall_comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExampleReview;
