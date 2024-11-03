// globalApi.jsx
import axios from "axios";
import { firestore } from "@/config/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

// Replace with your Firebase Realtime Database URL
const firebaseBaseURL =
  "https://ai-resume-builder-dd020-default-rtdb.firebaseio.com/";

const globalApi = axios.create({
  baseURL: firebaseBaseURL,
  headers: {
    "Content-Type": "application/json", // Specify the content type
    // Optionally, add other headers like Authorization if needed
    // 'Authorization': `Bearer ${yourAuthToken}`,
  },
});

// globalApi.jsx

// Function to get user resumes from Firestore by email
const GetUserResumes = async (userEmail) => {
  try {
    const resumesRef = collection(firestore, "resumes");
    const q = query(resumesRef, where("userEmail", "==", userEmail));
    
    const querySnapshot = await getDocs(q);
    // Map over the query results to return an array of resume data
    const resumes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(resumes)
    return resumes;
  } catch (error) {
    console.error("Error retrieving resumes:", error);
    throw error;
  }
};

// Function to update a specific resume document in Firestore
const UpdateResume = async (resumeID, updatedData) => {
  try {
    const resumeRef = doc(firestore, "resumes", resumeID);
    await updateDoc(resumeRef, updatedData);
    console.log("Resume updated successfully!");
  } catch (error) {
    console.error("Error updating resume:", error);
    throw error;
  }
};

export default { GetUserResumes,UpdateResume  };
