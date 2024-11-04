import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeContext";

const formFiels = {
  title: "",
  companyName: "",
  city: "",
  startDate: "",
  endDate: "",
  summery: "",
};
function Experience() {
  const [experienceList, setExperienceList] = useState([formFiels]);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formFiels]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div className="mt-5" key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 rounded-lg">
                <div className="col-span-2">
                  <label htmlFor="" className="text-xs ">
                    Position Title
                  </label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs ">
                    Company Name
                  </label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs ">
                    Company Location
                  </label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs ">
                    Start Date
                  </label>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs ">
                    End Date
                  </label>
                  <Input
                    name="endDate"
                    type="date"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="" className="text-xs ">
                    Summary
                  </label>
                  <RichTextEditor
                    index={index}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>

          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
