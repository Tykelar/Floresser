// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqdXHRd3l8kvXgZsPL2Dmwtz3SYnYf-xY",
  authDomain: "floresser-2502d.firebaseapp.com",
  databaseURL: "https://floresser-2502d-default-rtdb.firebaseio.com",
  projectId: "floresser-2502d",
  storageBucket: "floresser-2502d.firebasestorage.app",
  messagingSenderId: "890315265680",
  appId: "1:890315265680:web:5c42fd7f340cca51d5ea15"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);
