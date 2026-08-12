import api from './api';

export const getOpportunities = async ({ search = '', category = '' } = {}) => {
  const params = {};
  if (search) params.search = search;
  if (category && category !== 'All Categories') params.category = category;

  const response = await api.get('/opportunities', { params });
  return response.data;
};

export const getOpportunityById = async (id) => {
  const response = await api.get(`/opportunities/${id}`);
  return response.data;
};

export const createOpportunity = async (payload) => {
  const response = await api.post('/opportunities', payload);
  return response.data;
};

export const updateOpportunity = async (id, payload) => {
  const response = await api.put(`/opportunities/${id}`, payload);
  return response.data;
};

export const deleteOpportunity = async (id) => {
  const response = await api.delete(`/opportunities/${id}`);
  return response.data;
};
