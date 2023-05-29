import React from 'react';
// import {loginWithGoogle} from '@/features/authentication/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../common/config/FirebaseService';

function login() {
  const handleLogin = async () => {
    const googleAuth = new GoogleAuthProvider();
    await signInWithPopup(auth, googleAuth);
  };
  return (
    <div>
      <button
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default login;
