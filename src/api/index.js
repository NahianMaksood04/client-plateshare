import axios from "axios";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase.config";

const auth = getAuth(app);

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const getFeaturedFoods = async () => {
    const { data } = await api.get("/foods/featured");
    return data;
};

export const getAvailableFoods = async () => {
    const { data } = await api.get("/foods");
    return data;
};

export const getFoodById = async (id) => {
    const { data } = await api.get(`/foods/${id}`);
    return data;
};

export const getManageableFoods = async () => {
    const { data } = await api.get("/foods/manage");
    return data;
};

export const addFood = async (foodData) => {
    const { data } = await api.post("/foods", foodData);
    return data;
};

export const updateFood = async (id, foodData) => {
    const { data } = await api.patch(`/foods/${id}`, foodData);
    return data;
};

export const deleteFood = async (id) => {
    const { data } = await api.delete(`/foods/${id}`);
    return data;
};

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData,
    );
    return data.data.url;
};

export const createRequest = async (requestData) => {
    const { data } = await api.post("/requests", requestData);
    return data;
};

export const getRequestsForFood = async (foodId) => {
    const { data } = await api.get(`/requests/food/${foodId}`);
    return data;
};

export const getMyRequests = async () => {
    const { data } = await api.get("/requests/user");
    return data;
};

export const acceptRequest = async (requestId) => {
    const { data } = await api.patch(`/requests/${requestId}/accept`);
    return data;
};

export const rejectRequest = async (requestId) => {
    const { data } = await api.patch(`/requests/${requestId}/reject`);
    return data;
};

export default api;
