import request from '../requests';

export const getAllProducts = async (query) => {
  const products = await request({
    url: '/api/v1/products',
    method: 'get',
    params: query,
  });

  return products.data;
};

export const addProduct = async (data, config) => {
  const product = await request({
    url: '/api/v1/products',
    method: 'post',
    data: data,
    ...config,
  });

  return product.data;
};

export const updateProduct = async (id, data, config) => {
  const product = await request({
    url: `/api/v1/products/${id}`,
    method: 'PATCH',
    data: data,
    ...config,
  });

  return product.data;
};

export const deleteProduct = async (id, config) => {
  await request({
    url: `/api/v1/products/${id}`,
    method: 'DELETE',
    ...config,
  });
};
