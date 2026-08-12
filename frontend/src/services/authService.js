import api from './api';

export const registerStudent = async ({ name, email, password, confirmPassword }) => {
  const response = await api.post('/auth/register', { name, email, password, confirmPassword });
  return response.data;
};

export const loginStudent = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const loginAdmin = async ({ email, password }) => {
  const response = await api.post('/auth/admin/login', { email, password });
  return response.data;
};

export const getCurrentAccount = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
