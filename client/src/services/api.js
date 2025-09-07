import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// BCP API calls
export const getBCPs = () => api.get('/bcp');
export const getBCP = (id) => api.get(`/bcp/${id}`);
export const createBCP = (data) => api.post('/bcp', data);
export const updateBCP = (id, data) => api.put(`/bcp/${id}`, data);
export const saveBCP = (id, data) => {
  if (id) {
    return updateBCP(id, data);
  } else {
    return createBCP(data);
  }
};
export const deleteBCP = (id) => api.delete(`/bcp/${id}`);

// Sites API calls
export const getSites = () => api.get('/sites');
export const createSite = (data) => api.post('/sites', data);
export const updateSite = (id, data) => api.put(`/sites/${id}`, data);

// Owners API calls
export const getOwners = () => api.get('/owners');
export const searchOwners = (query) => api.get(`/owners/search?q=${query}`);
export const createOwner = (data) => api.post('/owners', data);

// Health check
export const healthCheck = () => api.get('/health');

export default api;