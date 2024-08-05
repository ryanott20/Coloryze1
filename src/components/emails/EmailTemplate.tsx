import * as React from "react";
import WelcomeEmail from "./WelcomeEmail";
import ReviewSubmitEmail from "./ReviewSubmitEmail";
import ReviewCompleteEmail from "./ReviewCompleteEmail";
import ReviewReminderEmail from "./ReviewReminderEmail";

interface EmailTemplateProps {
  emailType: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  emailType,
}) => {
  let EmailComponent;
  switch (emailType) {
    case "welcome":
      EmailComponent = WelcomeEmail;
      break;
    case "reviewsubmit":
      EmailComponent = ReviewSubmitEmail;
      break;
    case "reviewcomplete":
      EmailComponent = ReviewCompleteEmail;
      break;

    case "reviewreminder":
      EmailComponent = ReviewReminderEmail;
      break;
    default:
      EmailComponent = WelcomeEmail;
  }

  return (
    <div>
      <EmailComponent />
    </div>
  );
};
