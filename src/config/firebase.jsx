import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_APIKEY,
  authDomain: import.meta.env.VITE_PUBLIC_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_PROJECTID,
  storageBucket: import.meta.env.VITE_PUBLIC_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_MESSENGINGSENDERID,
  appId: import.meta.env.VITE_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, collection, addDoc };
