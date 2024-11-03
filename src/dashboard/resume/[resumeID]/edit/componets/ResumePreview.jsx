import { ResumeInfoContext } from "@/context/ResumeContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  console.log(resumeInfo);
  return (
    <div>
      {/* Personal Details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summary */}

      {/* Professional Experience */}

      {/* Educational */}

      {/* Skills */}
    </div>
  );
}

export default ResumePreview;
