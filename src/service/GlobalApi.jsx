// globalApi.jsx
import axios from "axios";

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

export default globalApi;
