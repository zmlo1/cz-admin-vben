import type { VbenFormProps } from '#/adapter/form';

export const upsertFormOptions: VbenFormProps = {
  schema: [
    {
      label: 'Nickname',
      component: 'Input',
      rules: 'required',
      componentProps: {
        placeholder: 'Nickname',
      },
      fieldName: 'nickname',
    },
    {
      label: 'Firstname',
      component: 'Input',
      rules: 'required',
      componentProps: {
        placeholder: 'Firstname',
      },
      fieldName: 'firstname',
    },
    {
      label: 'Lastname',
      component: 'Input',
      rules: 'required',
      componentProps: {
        placeholder: 'Lastname',
      },
      fieldName: 'lastname',
    },
    {
      label: 'Wechat',
      component: 'Input',
      componentProps: {
        placeholder: 'Wechat',
      },
      fieldName: 'wechatId',
    },
    {
      label: 'Birth',
      component: 'DatePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
        placeholder: 'Birth Date',
      },
      fieldName: 'birthDate',
    },
    {
      label: 'Acquaintance',
      component: 'DatePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
        placeholder: 'Acquaintance Date',
      },
      fieldName: 'acquaintanceDate',
    },
  ],
  showDefaultActions: false,
};
