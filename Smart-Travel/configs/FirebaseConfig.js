// Import Firebase SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Import correctly

//const auth;
// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFVrbXwya4Lp8kCbsGSPQQY8j0D768gM0",
  authDomain: "hehehe-6fb0d.firebaseapp.com",
  projectId: "hehehe-6fb0d",
  storageBucket: "hehehe-6fb0d.firebasestorage.app",
  messagingSenderId: "770785347912",
  appId: "1:770785347912:web:8256891fe94996bc034b7d",
  measurementId: "G-3VW5JRYRN8"
};

// ✅ Initialize the app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Use initializeAuth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };
export const db = getFirestore(app);