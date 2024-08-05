// components/CompletedReview.tsx
import React from "react";
import { BasicReview } from "./BasicReview";

import { ProReview } from "./ProReview";

const CompletedReview: React.FC<{ userData: any }> = ({ userData }) => {
  //("userData", userData);
  //console.log(userData.academic_review);
  if (userData.plan === "basic") {
    return <BasicReview userData={userData} />;
  }

  return <ProReview userData={userData} />;
};

export default CompletedReview;
