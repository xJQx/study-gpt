import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase/firebaseService';

export const loginWithGoogle = async () => {
  const googleAuth = new GoogleAuthProvider();
  await signInWithPopup(auth, googleAuth);
};
