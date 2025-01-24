<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getFriendApi } from '#/api/modules/user/friend';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  wrapperClass: 'grid-cols-9 gap-2',
  commonConfig: {
    hideLabel: true,
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter category',
      },
      defaultValue: '1',
      fieldName: 'category',
      label: 'Category',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter productName',
      },
      fieldName: 'productName',
      label: 'ProductName',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter price',
      },
      fieldName: 'price',
      label: 'Price',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: 'Color1',
            value: '1',
          },
          {
            label: 'Color2',
            value: '2',
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'color',
      label: 'Color',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      label: 'Date',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<RowType> = {
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
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        message.success(`Query params: ${JSON.stringify(formValues)}`);
        const items = await getFriendApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });

        return {
          items: items.slice(0, 20),
          total: items.length,
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

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <div class="vp-raw w-full">
    <Grid />
  </div>
</template>
