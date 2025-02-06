import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

type FriendPageResult = {
  list: any[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
};

export async function getFriendApi(
  query?: Recordable<any>,
): Promise<FriendPageResult> {
  return requestClient.get('/friend', { params: query });
}

export async function updateFriendApi(id: number, friend: any) {
  return requestClient.request(`/friend/${id}`, {
    method: 'PATCH',
    data: friend,
  });
}

export async function deleteFriendApi(id: number) {
  return requestClient.delete(`/friend/${id}`);
}
