import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeContext";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PersonalDetails({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeData = await GlobalApi.GetResumeById(params.resumeID);

        if (resumeData) {
          setFormData(resumeData);
          setResumeInfo(resumeData);
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    fetchResumeData();
  }, [params.resumeID, setResumeInfo]);

  const handleInputChange = (event) => {
    enableNext(false);

    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      [name]: value,
    }));
  };

  const onSave = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await GlobalApi.UpdateResume(params.resumeID, formData);
      console.log("Resume updated successfully!");
      enableNext(true);
      toast("Personal Details saved.");
    } catch (error) {
      console.error("Error updating resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with the basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label htmlFor="" className="text-sm">
              First Name
            </label>
            <Input
              name="firstName"
              required
              defaultValue={resumeInfo?.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Last Name
            </label>
            <Input
              name="lastName"
              required
              defaultValue={resumeInfo?.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="" className="text-sm">
              Job Title
            </label>
            <Input
              name="jobTitle"
              required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="" className="text-sm">
              Address
            </label>
            <Input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Phone Number
            </label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Email
            </label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
