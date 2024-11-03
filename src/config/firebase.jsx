// firebase.jsx
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_APIKEY,
  authDomain: import.meta.env.VITE_PUBLIC_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_PROJECTID,
  storageBucket: import.meta.env.VITE_PUBLIC_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_MESSENGINGSENDERID,
  appId: import.meta.env.VITE_PUBLIC_APPID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// Export both firebaseApp and firestore
export { firebaseApp, firestore, collection, addDoc };
