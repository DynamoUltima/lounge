// @ts-ignore
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6pFl9wTwActHt01izN2QdCfCkP2MrM0s",
    authDomain: "lounge-99970.firebaseapp.com",
    projectId: "lounge-99970",
    storageBucket: "lounge-99970.firebasestorage.app",
    messagingSenderId: "262285728023",
    appId: "1:262285728023:web:0f662147ba778785db7f52",
    measurementId: "G-V0TPDTZ75Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Analytics safely (works on web, might need different handling on native)
let analytics;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { analytics, app, auth, db, storage };

