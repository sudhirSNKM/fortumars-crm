// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFv8qV70Gw-WFKEV4A-0Veep_P7R150Pg",
    authDomain: "fir-a44fb.firebaseapp.com",
    projectId: "fir-a44fb",
    storageBucket: "fir-a44fb.firebasestorage.app",
    messagingSenderId: "160974975122",
    appId: "1:160974975122:web:8ed0b0095e6ff55968b64b",
    measurementId: "G-FJ3KCD7T3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);

// Types for our database
export type UserRegistration = {
    id?: string;
    userId?: string;
    email: string;
    full_name: string;
    company_name: string;
    phone_number: string;
    role?: string;
    industry?: string;
    team_size?: string;
    created_at?: Date;
};
