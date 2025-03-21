import type { VbenFormProps } from '#/adapter/form';

import { $t } from '#/locales';

export const searchFormOptions: VbenFormProps = {
  showCollapseButton: false, // 控制表单是否显示折叠按钮
  collapsed: false, // 默认展开
  wrapperClass:
    'grid gap-[0_8px] grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
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
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Like Search Firstname',
      },
      defaultValue: '',
      fieldName: 'firstname',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Like Search Lastname',
      },
      defaultValue: '',
      fieldName: 'lastname',
    },
  ],
  // 搜索按钮配置
  submitButtonOptions: {
    content: $t('element.button.search'),
  },
  // 重置按钮配置
  resetButtonOptions: {
    content: $t('element.button.reset'),
  },
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: true,
};
