import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export async function getFriendApi(query?: Recordable<any>): Promise<any[]> {
  return requestClient.get('/friend', { params: query });
}
