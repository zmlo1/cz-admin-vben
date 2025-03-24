import { requestClient } from '#/api/request';

export const getMyInfoApi = () => {
  return requestClient.get(`/user/current`);
};

export const updateMyInfoApi = (data: any) => {
  if (!data.id) throw new Error('id is required');

  return requestClient.request(`/user/${data.id}`, {
    method: 'PATCH',
    data,
  });
};
