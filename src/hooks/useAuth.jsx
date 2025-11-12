import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser ? {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL
      } : null);
      setInitializing(false);
    });
    return () => unsub();
  }, []);

  const register = async ({ name, email, password, photoURL }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (name || photoURL) {
        await updateProfile(res.user, { displayName: name, photoURL });
      }
      toast.success('Registration successful');
      return res.user;
    } catch (err) {
      toast.error(err.message || 'Registration failed');
      throw err;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in');
      return res.user;
    } catch (err) {
      toast.error(err.message || 'Login failed');
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google');
      return res.user;
    } catch (err) {
      toast.error(err.message || 'Google login failed');
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
    toast.success('Logged out');
  };

  // Get ID token (fresh) for Authorization
  const getIdToken = async () => {
    if (!auth.currentUser) return null;
    return await auth.currentUser.getIdToken(true);
  };

  return (
    <AuthContext.Provider value={{ user, initializing, register, login, loginWithGoogle, logout, getIdToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
