import api, { withAuth } from './apiClient';

export const createRequest = async (foodId, payload) => {
  const cfg = await withAuth();
  const res = await api.post(`/requests/${foodId}`, payload, cfg);
  return res.data;
};

export const getRequestsForFood = async (foodId) => {
  const cfg = await withAuth();
  const res = await api.get(`/requests/food/${foodId}`, cfg);
  return res.data;
};

export const updateRequestStatus = async (requestId, action) => {
  const cfg = await withAuth();
  const res = await api.patch(`/requests/${requestId}/status`, { action }, cfg);
  return res.data;
};
