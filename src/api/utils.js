import axios from 'axios';

// This utility function is not directly used by the API calls anymore
// but is kept here as it's related to the initial auth flow.
// The logic has been moved into the AuthContext for better state management.
export const getFirebaseIdToken = async (user, clearCookie = false) => {
    if (clearCookie) {
        // This endpoint should be created on your server to clear the cookie
        // await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {});
        return;
    }

    if (user) {
        const idToken = await user.getIdToken(true);
        // The token is now sent via Authorization header, so setting cookie is optional
        // and can be removed if not needed for other purposes.
        // await axios.post(`${import.meta.env.VITE_API_URL}/auth/set-token`, { idToken });
        return idToken;
    }
};
