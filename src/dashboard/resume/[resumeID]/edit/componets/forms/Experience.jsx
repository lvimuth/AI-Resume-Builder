import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";

const formFiels = {
  title: "",
  companyName: "",
  city: "",
  startDate: "",
  endDate: "",
  skills: "",
  summary: "",
};
function Experience() {
  const [experienceList, setExperienceList] = useState([formFiels]);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    console.log(experienceList);
  }, [setExperienceList]);

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formFiels]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div className="mt-5">
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
                    Skills
                  </label>
                  <Input
                    name="skills"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="" className="text-xs ">
                    Summary
                  </label>
                  <RichTextEditor />
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
