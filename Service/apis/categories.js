import request from '../requests';

export const getAllCategories = async (query) => {
  const res = await request({
    url: '/api/v1/categorys',
    method: 'get',
    params: query,
  });
  return res.data;
};

export const addCategory = async (data, config) => {
  const res = await request({
    url: '/api/v1/categorys',
    method: 'post',
    data: data,
    ...config,
  });

  return res.data;
};

export const deleteCategory = async (id, config) => {
  const res = await request({
    url: `api/v1/categorys/${id}`,
    method: 'delete',
    ...config,
  });

  return res;
};
