import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/FirebaseService';

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
