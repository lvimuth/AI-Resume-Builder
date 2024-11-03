import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
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

  const handleChange = (index, event) => {};
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div>
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
          <Button variant="outline" className="text-primary">
            + Add More Experience
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
