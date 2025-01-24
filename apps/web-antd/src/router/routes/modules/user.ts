import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'line-md:account',
      keepAlive: true,
      order: 1000,
      title: $t('user.title'),
    },
    name: 'User',
    path: '/user',
    children: [
      {
        meta: {
          title: $t('user.friend.title'),
        },
        name: 'Friend',
        path: '/user/friend',
        component: () => import('#/views/user/friend/index.vue'),
      },
    ],
  },
];

export default routes;
