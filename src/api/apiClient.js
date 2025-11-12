import axios from 'axios';
import { auth } from '../firebase';

// Base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Helper to attach Authorization Bearer token (call in requests)
export const withAuth = async (config = {}) => {
  const user = auth.currentUser;
  if (!user) return config;
  const idToken = await user.getIdToken(true);
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Bearer ${idToken}`
    }
  };
};

export default api;
