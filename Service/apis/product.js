import request from '../requests';

export const getAllProducts = async (query) => {
  const products = await request({
    url: '/api/v1/products',
    method: 'get',
    params: query,
  });

  return products.data;
};
