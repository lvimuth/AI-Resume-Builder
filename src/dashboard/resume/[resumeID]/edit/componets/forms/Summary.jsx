import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeContext";
import GlobalApi from "@/service/GlobalApi";
import { useParams } from "react-router-dom";
import { BrainCircuit, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "@/service/AIModel";

function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();
  const prompt =
    "{jobTitle}, Depends on job title give me a summary for my resume within 4-5 lines to just copy paste.the response should be in JSON format and with field experience Level and summary with experience level for fresher, mid-level and experience level";

  useEffect(() => {
    if (summary) {
      setResumeInfo({
        ...resumeInfo,
        summery: summary,
      });
    }
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();

      // Wrapping the response in brackets to make it a valid JSON array
      const wrappedResponseText = `[${responseText}]`;

      // Parse the JSON array
      const parsedData = JSON.parse(wrappedResponseText);
      setAiGeneratedSummaryList(parsedData);
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      toast("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              onClick={() => GenerateSummaryFromAI()}
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
            value={summary} // Bind Textarea to summary state
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummaryList && (
        <div className="mt-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              className="rounded-lg cursor-pointer border-black bg-gray-100 p-4 mt-4 hover:scale-105 shadow-lg"
              onClick={() => setSummary(item.summary)} // Set summary on click
            >
              <h2 className="font-bold my-1">Level: {item?.experienceLevel}</h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
