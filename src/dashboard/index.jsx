import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "@/service/GlobalApi";
import ResumeItem from "./components/ResumeItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumeList();
  }, [user]);

  const GetResumeList = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      const fetchedResumes = await GlobalApi.GetUserResumes(userEmail);
      console.log(fetchedResumes);
      setResumeList(fetchedResumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-32 ">
      <h2 className="font-bold text-3xl ">My Resume</h2>
      <p className="text-gray-500">
        Start Creating AI resume to your next <span>JOB ROLE</span>
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeItem resume={resume} key={index} />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
