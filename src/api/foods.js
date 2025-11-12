import api, { withAuth } from './apiClient';

export const fetchAllAvailableFoods = async () => {
  const res = await api.get('/foods');
  return res.data;
};

export const fetchFeaturedFoods = async () => {
  const res = await api.get('/foods/featured');
  return res.data;
};

export const fetchFoodById = async (id, idToken) => {
  // /api/foods/:id is protected in backend, so attach token
  // We'll rely on withAuth
  const cfg = await withAuth();
  const res = await api.get(`/foods/${id}`, cfg);
  return res.data;
};

export const createFood = async (payload) => {
  const cfg = await withAuth();
  const res = await api.post('/foods', payload, cfg);
  return res.data;
};

export const updateFood = async (id, payload) => {
  const cfg = await withAuth();
  const res = await api.patch(`/foods/${id}`, payload, cfg);
  return res.data;
};

export const deleteFood = async (id) => {
  const cfg = await withAuth();
  const res = await api.delete(`/foods/${id}`, cfg);
  return res.data;
};

export const fetchFoodsByDonator = async () => {
  const cfg = await withAuth();
  const res = await api.get('/foods/my/foods', cfg);
  return res.data;
};
