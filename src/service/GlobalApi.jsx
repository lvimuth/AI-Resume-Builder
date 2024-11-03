// globalApi.jsx
import axios from "axios";
import { firebaseApp } from "@/config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getFirestore,
  getDoc,
} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

const GetResumeById = async (resumeID) => {
  const docRef = doc(firestore, "resumes", resumeID);

  // Reference to specific document
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // Return the document data
  } else {
    throw new Error("No document found with the specified ID");
  }
};

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
    return resumes;
  } catch (error) {
    throw error;
  }
};

// Function to update a specific resume document in Firestore
const UpdateResume = async (resumeID, updatedData) => {
  try {
    const resumeRef = doc(firestore, "resumes", resumeID);
    await updateDoc(resumeRef, updatedData);
  } catch (error) {
    throw error;
  }
};

export default { GetUserResumes, UpdateResume, GetResumeById };
