
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Vite projects, environment variables are exposed on the `import.meta.env` object.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate that all config values are present.
// This provides a clearer error than the generic Firebase error if an env var is missing.
for (const [key, value] of Object.entries(firebaseConfig)) {
    if (!value) {
        const envVarKey = `VITE_FIREBASE_${key.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()}`;
        const errorMessage = `Firebase config failed: Missing value for "${key}" (expected from ${envVarKey} environment variable). Please check your application's configuration.`;
        
        // Display a user-friendly error on the screen
        document.body.innerHTML = `
          <div style="font-family: sans-serif; padding: 2rem; text-align: center; background-color: #fef2f2; color: #991b1b; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <h1 style="font-size: 1.5rem; font-weight: bold;">Application Configuration Error</h1>
            <p style="margin-top: 1rem; max-width: 600px;">${errorMessage}</p>
          </div>
        `;
        throw new Error(errorMessage);
    }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };