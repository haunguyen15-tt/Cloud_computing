import request from '../requests';

export const createOrder = async (data) => {
  const order = await request({
    url: 'api/v1/orders',
    method: 'POST',
    data: JSON.stringify(data),
  });

  return order.data;
};
