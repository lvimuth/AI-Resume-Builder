import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormSection from "./componets/FormSection";
import ResumePreview from "./componets/ResumePreview";

function EditResume() {
  const params = useParams();

  useEffect(() => {
    console.log(params);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      {/* Form Section */}
      <FormSection/>

      {/* Preview Section */}
      <ResumePreview/>
    </div>
  );
}

export default EditResume;
