import type { VxeGridProps } from '#/adapter/vxe-table';

import { getFriendApi } from '#/api/modules/user/friend';

export const gridOptions: VxeGridProps<any> = {
  align: 'left',
  height: 'auto',
  sortConfig: {
    remote: true,
  },
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
      sortable: true,
      width: 180,
    },
    {
      align: 'left',
      title: 'Fullname',
      width: 240,
      slots: { default: 'fullname' },
      showOverflow: true,
    },
    {
      align: 'left',
      title: 'Wechat',
      field: 'wechatId',
      width: 180,
      sortable: true,
      showOverflow: true,
      slots: { default: 'wechatId' },
    },
    {
      field: 'birthDate',
      title: 'Birth Date',
      width: 140,
      slots: { default: 'birthDate' },
    },
    {
      field: 'acquaintanceDate',
      title: 'Acquaintance Date',
      width: 180,
      slots: { default: 'acquaintanceDate' },
    },
    {
      align: 'left',
      title: 'Action',
      slots: { default: 'action' },
    },
  ],
  keepSource: true,
  rowConfig: {
    isCurrent: true,
  },
  pagerConfig: {
    align: 'right',
    pagerCount: 5,
    layouts: ['PrevPage', 'Number', 'NextPage', 'Total'],
  },
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
    custom: true,
    refresh: true,
  },
};
