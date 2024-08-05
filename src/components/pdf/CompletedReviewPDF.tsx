// components/CompletedReviewPDF.tsx
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

interface CompletedReviewPDFProps {
  userData: any;
  plan: any;
}

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aX8.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr6Hw5aX8.ttf",
      fontWeight: "medium",
    },
    {
      src: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aX8.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Montserrat",
    fontSize: 12,
    paddingVertical: 40,
    paddingHorizontal: 35,
  },
  section: {
    marginBottom: 10,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: "#004684",
    fontWeight: "bold",
  },
  description: {
    fontSize: 10,
    color: "#888",
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
    fontSize: 12,
    lineHeight: 1.5,
  },
  logo: {
    marginBottom: 15,
    alignItems: "center",
  },
  logoImage: {
    width: 100,
  },
  separator: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#004684",
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 35,
    right: 35,
    fontSize: 10,
    color: "#888",
    textAlign: "center",
  },
});

const CompletedReviewPDF: React.FC<CompletedReviewPDFProps> = ({
  userData,
  plan,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logo}>
          <Image src="/bluelogo.png" style={styles.logoImage} />
          <Text style={styles.heading}>College Application Review</Text>{" "}
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading]}>Personal Information</Text>
          <Text style={styles.description}>
            Basic information about the applicant.
          </Text>
          <View style={styles.separator} />
          <Text style={styles.text}>
            <Text style={styles.bold}>Name:</Text> {userData.name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Email:</Text> {userData.email}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>School:</Text> {userData.school}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Is Magnet School:</Text>{" "}
            {userData.is_magnet_school ? "Yes" : "No"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Graduation Year:</Text>{" "}
            {userData.graduation_year}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Hooks:</Text> {userData.hooks}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Additional Information:</Text>{" "}
            {userData.additional_info}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Major:</Text> {userData.major}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading]}>Academic Information</Text>
          <Text style={styles.description}>
            Information about the applicant&apos;s academic performance and test
            scores.
          </Text>
          <View style={styles.separator} />
          <Text style={styles.text}>
            <Text style={styles.bold}>GPA:</Text> {userData.gpa}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>SAT Score:</Text> {userData.sat_score}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading]}>Extracurriculars</Text>
          <Text style={styles.description}>
            List of the applicant&apos;s extracurricular activities and
            involvement.
          </Text>
          <View style={styles.separator} />
          {/* {userData.extracurriculars.map((activity, index) => (
            <Text key={index} style={styles.text}>
              {activity}
            </Text>
          ))} */}
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading]}>Classes</Text>
          <Text style={styles.description}>
            List of the applicant&apos;s classes and coursework.
          </Text>
          <View style={styles.separator} />
          {/* {userData.classes.map((class_, index) => (
            <Text key={index} style={styles.text}>
              {class_}
            </Text>
          ))} */}
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading]}>Top Colleges</Text>
          <Text style={styles.description}>
            List of the applicant&apos;s top college choices.
          </Text>
          <View style={styles.separator} />
          {/* {userData.top_colleges.map((college, index) => (
            <Text key={index} style={styles.text}>
              {college}
            </Text>
          ))} */}
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading]}>Grades</Text>
          <Text style={styles.description}>
            Review of the applicant&apos;s grades and academic performance.
          </Text>
          <View style={styles.separator} />
          <Text style={styles.text}>
            <Text style={styles.bold}>Grade:</Text>{" "}
            {userData.academic_review.grade}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Reasoning:</Text>{" "}
            {userData.academic_review.reasoning}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading]}>Extracurriculars</Text>
          <Text style={styles.description}>
            Review of the applicant&apos;s extracurricular involvement and
            impact.
          </Text>
          <View style={styles.separator} />
          <Text style={styles.text}>
            <Text style={styles.bold}>Grade:</Text>{" "}
            {userData.extracurriculars_reviews.grade}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Reasoning:</Text>{" "}
            {userData.extracurriculars_reviews.reasoning}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading]}>Intellectual Exploration</Text>
          <Text style={styles.description}>
            Review of the applicant&apos;s intellectual curiosity and
            exploration outside the classroom.
          </Text>
          <View style={styles.separator} />
          <Text style={styles.text}>
            <Text style={styles.bold}>Grade:</Text>{" "}
            {userData.classes_reviews.grade}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Reasoning:</Text>{" "}
            {userData.classes_reviews.reasoning}
          </Text>
        </View>
        {plan === "basic" && (
          <>
            <View style={styles.section}>
              <Text style={[styles.heading]}>Extracurricular Ideas</Text>
              <Text style={styles.description}>
                Potential ideas for extracurriculars.
              </Text>
              <View style={styles.separator} />
              <Text style={styles.text}>
                <Text style={[styles.text, styles.bold]}>EC Idea 1:</Text>{" "}
                {userData.spike_review.spike1.description}
              </Text>
              <Text style={styles.text}>
                <Text style={[styles.text, styles.bold]}>EC Idea 2:</Text>{" "}
                {userData.spike_review.spike2.extracurricularIdea}
              </Text>
            </View>
          </>
        )}

        {plan === "pro" && (
          <>
            <View style={styles.section}>
              <Text style={[styles.heading]}>College Spikes</Text>
              <Text style={styles.description}>
                Specific fields the applicant should specialize and stand out
                in.
              </Text>
              <View style={styles.separator} />
              <Text style={[styles.text, styles.bold]}>
                Spike 1: {userData.spike_review.spike1.title}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Description:</Text>{" "}
                {userData.spike_review.spike1.description}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Extracurricular Idea:</Text>{" "}
                {userData.spike_review.spike1.extracurricularIdea}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Essay Idea:</Text>{" "}
                {userData.spike_review.spike1.essayIdea}
              </Text>
              <View style={[styles.separator, { marginTop: 15 }]} />
              <Text style={[styles.text, styles.bold]}>
                Spike 2: {userData.spike_review.spike2.title}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Description:</Text>{" "}
                {userData.spike_review.spike2.description}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Extracurricular Idea:</Text>{" "}
                {userData.spike_review.spike2.extracurricularIdea}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Essay Idea:</Text>{" "}
                {userData.spike_review.spike2.essayIdea}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.heading]}>College Narrative</Text>
              <Text style={styles.description}>
                How the applicant should position themselves within their
                college application, including extracurriculars, essays, and
                interviews.
              </Text>
              <View style={styles.separator} />
              {/* {Array.isArray(userData.narrative_review) ? (
                userData.narrative_review.map((comment, index) => (
                  <Text key={index} style={styles.text}>
                    {comment}
                  </Text>
                ))
              ) : (
                <Text style={styles.text}>{userData.narrative_review}</Text>
              )} */}
            </View>
          </>
        )}

        <View style={styles.section}>
          <Text style={[styles.heading]}>Overall Comments</Text>
          <Text style={styles.description}>
            General comments about the applicant&apos;s overall application.
          </Text>
          <View style={styles.separator} />
          {/* {userData.overall_comments.map((comment, index) => (
            <Text key={index} style={styles.text}>
              {comment}
            </Text>
          ))} */}
        </View>
      </Page>
    </Document>
  );
};

export default CompletedReviewPDF;
