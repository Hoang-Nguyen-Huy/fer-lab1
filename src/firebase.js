// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGYw_TG3UpZOox8SlioWPcj6wej07onVA",
  authDomain: "fer-lab-da8b3.firebaseapp.com",
  projectId: "fer-lab-da8b3",
  storageBucket: "fer-lab-da8b3.appspot.com",
  messagingSenderId: "625078386291",
  appId: "1:625078386291:web:f1ce015a2d380b2cbbf406",
  measurementId: "G-642HVRZF5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
