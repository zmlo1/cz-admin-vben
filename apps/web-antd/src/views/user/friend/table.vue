<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteFriendApi, getFriendApi } from '#/api/modules/user/friend';

const formOptions: VbenFormProps = {
  showCollapseButton: false, // 控制表单是否显示折叠按钮
  collapsed: false, // 默认展开
  wrapperClass: 'grid-cols-4 gap-2',
  commonConfig: {
    hideLabel: true,
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Like Search Nickname',
      },
      defaultValue: '',
      fieldName: 'nickname',
      label: 'Nickname',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Like Search Firstname',
      },
      defaultValue: '',
      fieldName: 'firstname',
      label: 'Firstname',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Like Search Lastname',
      },
      defaultValue: '',
      fieldName: 'lastname',
      label: 'Lastname',
    },
  ],
  submitButtonOptions: {
    content: 'Search',
  },
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: true,
};

const gridOptions: VxeGridProps<any> = {
  align: 'left',
  height: 'auto',
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  editConfig: {
    trigger: 'dblclick',
    mode: 'cell',
  },
  columns: [
    { title: 'Index', type: 'seq', width: 60 },
    {
      align: 'left',
      editRender: { name: 'input' },
      field: 'nickname',
      title: 'Nickname',
      width: 180,
    },
    {
      align: 'left',
      title: 'Fullname',
      width: 240,
      slots: { default: 'fullname' },
      showOverflow: true,
    },
    { field: 'birthDate', title: 'Birth Date', width: 140 },
    { field: 'acquaintanceDate', title: 'Acquaintance Date', width: 180 },
    {
      align: 'left',
      title: 'Action',
      slots: { default: 'action' },
    },
  ],
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const { list, pagination } = await getFriendApi({
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        });

        return {
          items: list,
          total: pagination.total,
        };
      },
    },
  },
  toolbarConfig: {
    // 是否显示搜索表单控制按钮
    // @ts-ignore 正式环境时有完整的类型声明
    search: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  tableTitle: 'Friend',
  tableTitleHelp: `The information on this page is the friend's information, such as birthday, acquaintance time, etc.`,
  formOptions,
  gridOptions,
});

function onEdit(row: any) {
  gridApi.grid?.setEditRow(row);
}

async function onDelete(row: any) {
  const friendId = row.id;
  if (!friendId) {
    message.error('This is an error message');
    return;
  }

  await deleteFriendApi(friendId);
  message.success(`Delete ${row.nickname} Successfully!`);
  gridApi.query();
}
</script>

<template>
  <Grid>
    <template #fullname="{ row }">
      {{ `${row.firstname} ${row.lastname}` }}
    </template>
    <template #action="{ row }">
      <div class="flex gap-2">
        <Button type="primary" size="small" @click="onEdit(row)">Edit</Button>
        <Button type="primary" size="small" danger @click="onDelete(row)">
          Delete
        </Button>
      </div>
    </template>
  </Grid>
</template>
