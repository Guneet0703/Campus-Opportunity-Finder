import api from './api';

export const getBookmarks = async () => {
  const response = await api.get('/bookmarks');
  return response.data;
};

export const getBookmarkIds = async () => {
  const response = await api.get('/bookmarks/ids');
  return response.data;
};

export const addBookmark = async (opportunityId) => {
  const response = await api.post(`/bookmarks/${opportunityId}`);
  return response.data;
};

export const removeBookmark = async (opportunityId) => {
  const response = await api.delete(`/bookmarks/${opportunityId}`);
  return response.data;
};
