import axios from "axios";
import { auth } from "../services/firebase";

const instance = axios.create({
baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
withCredentials: false
});

instance.interceptors.request.use(
async (config) => {
const u = auth.currentUser;
if (u) {
const token = await u.getIdToken();
config.headers.Authorization = Bearer ${token};
}
return config;
},
(error) => Promise.reject(error)
);

export default instance;