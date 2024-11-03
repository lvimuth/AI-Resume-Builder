import React, { useContext, useEffect, useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import { ResumeInfoContext } from "@/context/ResumeContext";
import GlobalApi from "@/service/GlobalApi";
import { useParams } from "react-router-dom";

function FormSection() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeData = await GlobalApi.GetResumeById(params.resumeID);

        if (resumeData) {
          setResumeInfo(resumeData);
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    fetchResumeData();
  }, [params.resumeID, setResumeInfo]);
  return (
    <div>
      {/* Personal Details */}
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid />
          Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              variant="outline"
              className=""
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIndex == 1 ? (
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summary enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Summary */}
      {/* Experience */}
      {/* Education */}
      {/* Skills */}
    </div>
  );
}

export default FormSection;
