import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_PUBLIC_APIKEY,
  authDomain: process.env.VITE_PUBLIC_AUTHDOMAIN,
  projectId: process.env.VITE_PUBLIC_PROJECTID,
  storageBucket: process.env.VITE_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.VITE_PUBLIC_MESSENGINGSENDERID,
  appId: process.env.VITE_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
