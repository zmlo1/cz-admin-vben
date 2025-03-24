<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Input, message, Upload } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { MaterialSymbolsAddRounded } from '#/adapter/icon';
import { getMyInfoApi, updateMyInfoApi } from '#/api/modules/user/my';
import { $t } from '#/locales';

const userId = ref<number>();
const initData = ref<any>(null);

const [Form, formApi] = useVbenForm({
  schema: [
    {
      label: '',
      fieldName: 'avatar',
      component: 'Avatar',
    },
    {
      label: 'Username',
      fieldName: 'username',
      disabled: true,
      component: 'Input',
      componentProps: {
        class: 'w-[360px]',
        placeholder: 'Please enter username',
      },
    },
    {
      label: 'Password',
      fieldName: 'oldPassword',
      component: 'InputPassword',
      componentProps: {
        class: 'w-[360px]',
        placeholder: 'Please enter old password',
      },
    },
    {
      label: '',
      fieldName: 'newPassword',
      component: 'InputPassword',
      componentProps: {
        class: 'w-[360px]',
        placeholder: 'Please enter new password',
      },
    },
    {
      label: '',
      fieldName: 'confirmNewPassword',
      component: 'InputPassword',
      componentProps: {
        class: 'w-[360px]',
        placeholder: 'Please enter confirm new password',
      },
    },
    {
      label: 'Firstname',
      fieldName: 'firstname',
      component: 'Input',
      componentProps: {
        class: 'w-[360px]',
        placeholder: 'Please enter firstname',
      },
    },
    {
      label: 'Lastname',
      fieldName: 'lastname',
      component: 'Input',
      componentProps: {
        class: 'w-[360px]',
        placeholder: 'Please enter lastname',
      },
    },
    {
      label: 'Nickname',
      fieldName: 'nickname',
      component: 'Input',
      componentProps: {
        class: 'w-[360px]',
        placeholder: 'Please enter nickname',
      },
    },
    {
      label: 'Phone',
      fieldName: 'phone',
      component: 'Input',
      componentProps: {
        class: 'w-[360px]',
        placeholder: 'Please enter phone',
      },
    },
    {
      label: 'Email',
      fieldName: 'email',
      component: 'Input',
      componentProps: {
        type: 'text',
        class: 'w-[360px]',
        placeholder: 'Please enter email',
      },
    },
    {
      label: 'Remark',
      fieldName: 'remark',
      component: 'Input',
      componentProps: {
        class: 'w-[540px]',
        rows: 4,
        maxLength: 100,
        showCount: true,
        placeholder: 'Please enter remark',
      },
    },
  ],
  actionWrapperClass: 'flex justify-start pl-[100px]',
  submitButtonOptions: {
    content: $t('element.button.save'),
  },
  resetButtonOptions: {
    content: $t('element.button.cancel'),
  },
  async handleSubmit(values) {
    try {
      await updateMyInfoApi({ ...values, id: userId.value });
      message.success('Update success.');
    } catch (error: any) {
      message.error(error.message);
    }
  },
});

onMounted(() => {
  getMyInfoApi().then((res) => {
    initData.value = res;
    userId.value = res.id;
    formApi.setValues(res);
  });
});
</script>

<template>
  <Page :title="$t('user.my.title')" class="h-full" :auto-content-height="true">
    <Card class="h-full">
      <Form>
        <template #avatar>
          <Upload list-type="picture-card">
            <MaterialSymbolsAddRounded class="text-2xl" />
          </Upload>
        </template>
        <template #remark="slotProps">
          <Input.TextArea v-bind="slotProps" />
        </template>
      </Form>
    </Card>
  </Page>
</template>
