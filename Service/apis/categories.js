import request from '../requests';

export const getAllCategories = async (query) => {
  const categories = await request({
    url: '/api/v1/categorys',
    method: 'get',
    params: query,
  });
  return categories.data;
};
