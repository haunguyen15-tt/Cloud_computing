import request from '../requests';

export const getAllUsers = async (config) => {
  const users = await request({
    url: 'api/v1/users',
    method: 'GET',
    ...config,
  });

  return users.data;
};

export const updateUser = async (id, data) => {
  const user = await request({
    url: `api/v1/users/${id}`,
    method: 'patch',
    data: data,
  });

  return user.data;
};
