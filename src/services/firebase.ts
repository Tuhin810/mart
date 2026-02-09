import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDIdlt_cjVDwXBCr5h7eTn3a84eYtlfRsY",
    authDomain: "mart-7d08a.firebaseapp.com",
    projectId: "mart-7d08a",
    storageBucket: "mart-7d08a.firebasestorage.app",
    messagingSenderId: "1029555455858",
    appId: "1:1029555455858:web:511210f08d169ae0b7ffeb",
    measurementId: "G-PFHLNVCK75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
