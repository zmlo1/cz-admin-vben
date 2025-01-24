<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getFriendApi } from '#/api/modules/user/friend';

// 数据实例
// const MOCK_TREE_TABLE_DATA = [
//   {
//     date: '2020-08-01',
//     id: 10_000,
//     name: 'Test1',
//     parentId: null,
//     size: 1024,
//     type: 'mp3',
//   },
// ]

/**
 * 获取示例表格数据
 */
async function getFriends(params: Recordable<any>) {
  return new Promise<{ items: any; total: number }>((resolve) => {
    const { page, pageSize } = params;

    getFriendApi().then((items) => {
      items.slice((page - 1) * pageSize, page * pageSize);
      resolve({
        total: items.length,
        items,
      });
    });
  });
}

const gridOptions: VxeGridProps = {
  align: 'left',
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: 'Index', type: 'seq', width: 60 },
    { align: 'left', field: 'nickname', title: 'Nickname', width: 180 },
    { field: 'birthDate', title: 'Birth Date', width: 140 },
    { field: 'acquaintanceDate', title: 'Acquaintance Date' },
  ],
  exportConfig: {},
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await getFriends({
          page: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    // import: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});
</script>

<template>
  <div class="vp-raw w-full">
    <Grid>
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="() => gridApi.query()">
          刷新当前页面
        </Button>
        <Button type="primary" @click="() => gridApi.reload()">
          刷新并返回第一页
        </Button>
      </template>
    </Grid>
  </div>
</template>
