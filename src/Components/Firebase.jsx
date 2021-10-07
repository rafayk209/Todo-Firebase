import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAryLiNtosZ_kVLyNiEvU85oYTAtoiEMSA",
  authDomain: "todo-reactjs-firebase-40056.firebaseapp.com",
  projectId: "todo-reactjs-firebase-40056",
  storageBucket: "todo-reactjs-firebase-40056.appspot.com",
  messagingSenderId: "400733432267",
  appId: "1:400733432267:web:aacd2dfa512cf6aa196e4e"
};
initializeApp(firebaseConfig)

// Initialize Firebase
export const db = getFirestore();

