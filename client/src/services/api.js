import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// BCP API calls
export const getBCPs = async () => {
  const response = await api.get('/bcp');
  return response.data;
};

export const getBCP = async (id) => {
  const response = await api.get(`/bcp/${id}`);
  return response.data;
};

export const createBCP = async (data) => {
  const response = await api.post('/bcp', data);
  return response.data;
};

export const updateBCP = async (id, data) => {
  const response = await api.put(`/bcp/${id}`, data);
  return response.data;
};

export const saveBCP = async (id, data) => {
  if (id) {
    return await updateBCP(id, data);
  } else {
    return await createBCP(data);
  }
};

export const deleteBCP = async (id) => {
  const response = await api.delete(`/bcp/${id}`);
  return response.data;
};

// Sites API calls
export const getSites = async () => {
  const response = await api.get('/sites');
  return response.data;
};

export const createSite = async (data) => {
  const response = await api.post('/sites', data);
  return response.data;
};

export const updateSite = async (id, data) => {
  const response = await api.put(`/sites/${id}`, data);
  return response.data;
};

// Owners API calls
export const getOwners = async () => {
  const response = await api.get('/owners');
  return response.data;
};

export const searchOwners = async (query) => {
  const response = await api.get(`/owners/search?q=${query}`);
  return response.data;
};

export const createOwner = async (data) => {
  const response = await api.post('/owners', data);
  return response.data;
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;