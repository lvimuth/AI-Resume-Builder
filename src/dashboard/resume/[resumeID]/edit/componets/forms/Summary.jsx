import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeContext";
import GlobalApi from "@/service/GlobalApi";
import { useParams } from "react-router-dom";
import { BrainCircuit, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState();
  const params = useParams();

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summery: summary,
      });
  }, [summary]);

  const onSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      summery: summary,
    };

    try {
      await GlobalApi.UpdateResume(params.resumeID, data);
      console.log("Resume updated successfully!");
      enableNext(true);
      toast("Profile Summary saved.");
    } catch (error) {
      console.error("Error updating resume:", error);
    } finally {
      setLoading(false);
    }
    console.log("Resume Info", resumeInfo?.firstName);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your Resume Profile</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="">Add Summary</label>
            <Button
              variant="outline"
              type="button"
              className="border-primary text-primary flex gap-2"
              size="sm"
            >
              <BrainCircuit className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Summary;
