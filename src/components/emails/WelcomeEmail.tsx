import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `${process.env.VERCEL_URL}` : "";

export const StripeWelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>
      Your ivy-league level college application is just a few questions away.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={`https://i.ibb.co/yS6P9v0/blue-no-bg.png`}
            width="100"
            alt="Ivyfy"
          />
          <Hr style={hr} />
          <Text style={paragraph}>
            Thanks for signing up! You&apos;re now ready to ivyfy your
            applicaiton.
          </Text>
          <Text style={paragraph}>
            Simply fill out the questions on the dashboard, pay your one-time
            review fee, and wait 24 hours. That&apos;s it!
          </Text>
          <Button style={button} href="https://app.ivyfy.me">
            View your Dashboard
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            We&apos;ll be here to help you with any step along the way. Just
            respond to this email with any concerns!
          </Text>
          <Text style={paragraph}>— The Ivyfy team</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Ivyfy, 42075 Loudoun Academy Dr, Leesburg, VA 20175
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default StripeWelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#004684",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
