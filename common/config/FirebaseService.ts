import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.AUTH_DOMAIN || process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID || process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket:
    process.env.STORAGE_BUCKET || process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId:
    process.env.MESSAGING_SENDER_ID ||
    process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.APP_ID || process.env.NEXT_PUBLIC_APP_ID,
  databaseURL: process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
