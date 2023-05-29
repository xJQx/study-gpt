import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/common/config/FirebaseService';
const loginWithGoogle = () => {
  const googleAuth = new GoogleAuthProvider();
  signInWithPopup(auth, googleAuth);
};

export default loginWithGoogle;
