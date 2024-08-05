"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import CompletedReviewPDF from "./CompletedReviewPDF";

interface ExportToPDFButtonProps {
  userData: any;
  plan: any;
}

const ExportToPDFButton: React.FC<ExportToPDFButtonProps> = ({
  userData,
  plan,
}) => {
  const generatePDF = async () => {
    console.log("Generating PDF");
    console.log(plan);
    const doc = <CompletedReviewPDF userData={userData} plan={plan} />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    return blob;
  };

  const openPDF = async () => {
    const blob = await generatePDF();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return <Button onClick={openPDF}>Export Review To PDF</Button>;
};

export default ExportToPDFButton;
