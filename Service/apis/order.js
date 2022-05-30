import request from '../requests';

export const createOrder = async (data) => {
  const order = await request({
    url: 'api/v1/orders',
    method: 'POST',
    data: JSON.stringify(data),
  });

  return order.data;
};

export const getAllOrders = async () => {
  const orders = await request({
    url: 'api/v1/orders',
    method: 'GET',
  });

  return orders.data;
};

export const updateOrder = async (id, data, config) => {
  const order = await request({
    url: `api/v1/orders/${id}`,
    method: 'patch',
    data: data,
    ...config,
  });

  return order.data;
};
