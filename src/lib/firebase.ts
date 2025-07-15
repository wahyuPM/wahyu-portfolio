/**
 * Firebase initialization module.
 * Exports the initialized Firebase app and (optionally) analytics.
 * Ensures single initialization and safe usage in SSR environments.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWAoNe6R5DCZya07B_HennI-scqfqM1Kg",
  authDomain: "portfolio-ed3df.firebaseapp.com",
  projectId: "portfolio-ed3df",
  storageBucket: "portfolio-ed3df.firebasestorage.app",
  messagingSenderId: "592966681507",
  appId: "1:592966681507:web:6b48ced6e13897b7ef9016",
  measurementId: "G-1V5X9J6MF7",
};

// Initialize Firebase app (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Analytics should only be initialized in the browser
let analytics: ReturnType<typeof getAnalytics> | undefined = undefined;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
