import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyCZemlC5gWk_nwuLWn-kwGO03cGtdOY-sA",
authDomain: "plate-share-70dc7.firebaseapp.com",
projectId: "plate-share-70dc7",
storageBucket: "plate-share-70dc7.firebasestorage.app",
messagingSenderId: "822622902825",
appId: "1:822622902825:web:d7c15b56fe76274a209a38"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

