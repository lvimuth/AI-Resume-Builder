import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeContext";
import { AIChatSession } from "@/service/AIModel";
import { BrainCircuit } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { toast } from "sonner";

const PROMPT =
  "Position title: {positionTitle}, Depend on the position title give me 5-7 bullet points for my experience for resume. Give me result in HTML format.";
function RichTextEditor({ onRichTextEditorChange, index }) {
  const [value, setValue] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experience, setExperience] = useState("");
  const [aiGeneratedExperienceList, setAiGeneratedExperienceList] = useState();

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo.experience[index].title) {
      toast("Please Add Position Title");
      return;
    }
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log(responseText);
      // Wrapping the response in brackets to make it a valid JSON array
      const wrappedResponseText = `[${responseText}]`;

      // Parse the JSON array
      const parsedData = JSON.parse(wrappedResponseText);
      setAiGeneratedExperienceList(parsedData);
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      toast("Failed to generate summary. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <div className="mb-2">
          <Button
            onClick={GenerateSummeryFromAI}
            variant="outline"
            size="sm"
            className="flex gap-2 border-primary text-primary"
          >
            <BrainCircuit className="h-4 w-4" /> Generate from AI
          </Button>
        </div>
        <EditorProvider>
          <Editor
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              value = { experience };
              onRichTextEditorChange(e);
              setExperience(e.target.value);
            }}
          >
            <Toolbar>
              <BtnBold />
              <BtnItalic />
            </Toolbar>
          </Editor>
        </EditorProvider>
      </div>
      {aiGeneratedExperienceList && (
        <div className="mt-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedExperienceList.map((item, index) => (
            <div
              key={index}
              className="rounded-lg cursor-pointer border-black bg-gray-100 p-4 mt-4 hover:scale-105 shadow-lg"
              onClick={() => setExperience(item.experience)} // Set Experience on click
            >
              {/* <h2 className="font-bold my-1">Level: {item?.experienceLevel}</h2> */}
              <p>{item.experience}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RichTextEditor;
