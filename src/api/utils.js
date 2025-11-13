import axios from "axios";

export const getFirebaseIdToken = async (user, clearCookie = false) => {
    if (clearCookie) {
        return;
    }

    if (user) {
        const idToken = await user.getIdToken(true);
        return idToken;
    }
};
