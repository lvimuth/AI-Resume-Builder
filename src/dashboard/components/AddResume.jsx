import { Button } from "@/components/ui/button";
import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import { firestore, collection, addDoc } from "@/config/firebase"; // Import Firestore functions
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);

    const data = {
      title: resumeTitle,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };

    try {
      // Add data to the Firestore collection "resumes"
      const docRef = await addDoc(collection(firestore, "resumes"), data);
      console.log(docRef.id);
      console.log("Resume added successfully!");

      // Use Firestore document ID in the navigation path
      navigation("/dashboard/resume/" + docRef.id + "/edit");

      setOpenDialog(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding resume:", error);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border flex items-center justify-center bg-secondary rounded-md h-[280px] hover:scale-105 transition-all shadow-lg cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      {openDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/2 relative">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Create a New Resume</h2>
              <div className="cursor-pointer p-1 rounded-md hover:scale-105 hover:border border-black">
                <IoMdClose onClick={() => setOpenDialog(false)} />
              </div>
            </div>
            <p className="text-gray-500 mb-4">
              Fill out the information to add a new resume.
            </p>
            <p>Add a title for your resume</p>
            <Input
              className="my-2"
              placeholder="Ex. Full Stack Resume"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
            <div className="flex justify-end gap-4 mt-4">
              <Button
                className="bg-red-500 hover:bg-red-700 border-none"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-700 border-none"
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddResume;
