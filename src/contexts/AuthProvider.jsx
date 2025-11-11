import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../services/firebase";
import {
onAuthStateChanged,
signInWithEmailAndPassword,
signOut,
createUserWithEmailAndPassword,
updateProfile,
signInWithPopup
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [authLoading, setAuthLoading] = useState(true);

useEffect(() => {
const unsub = onAuthStateChanged(auth, async (u) => {
setUser(u || null);
setAuthLoading(false);
});
return () => unsub();
}, []);

const register = async (name, photoURL, email, password) => {
const cred = await createUserWithEmailAndPassword(auth, email, password);
if (cred.user) {
await updateProfile(cred.user, { displayName: name, photoURL });
return cred.user;
}
};

const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
const logout = () => signOut(auth);

const value = { user, authLoading, register, login, loginWithGoogle, logout };
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

