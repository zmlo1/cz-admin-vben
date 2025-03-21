<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  MaterialSymbolsAddRounded,
  MaterialSymbolsSearchRounded,
} from '#/adapter/icon';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createFriendApi,
  deleteFriendApi,
  updateFriendApi,
} from '#/api/modules/user/friend';

import { gridOptions } from './grid-options';
import { searchFormOptions } from './search-form-options';
import { upsertFormOptions } from './upsert-form-options';

const upsertModelTitle = ref('Add Friend');
const editRowId = ref<null | number>(null);

const [Grid, gridApi] = useVbenVxeGrid({
  tableTitle: 'Friend',
  tableTitleHelp: `The information on this page is the friend's information, such as birthday, acquaintance time, etc.`,
  formOptions: searchFormOptions,
  gridOptions,
});

const [UpsertForm, upsertFormApi] = useVbenForm(upsertFormOptions);

const [Model, modelApi] = useVbenModal({
  title: upsertModelTitle.value,
  draggable: true,
  onConfirm: async () => {
    const { valid } = await upsertFormApi.validate();

    if (!valid) return;

    const formData = await upsertFormApi.getValues();

    try {
      await (upsertModelTitle.value === 'Add Friend'
        ? createFriendApi(formData)
        : updateFriendApi(editRowId.value!, formData));
      message.success('Success');

      gridApi.query();
      modelApi.close();
    } catch {
      message.error('Failed');
    }
  },
});

function onAdd() {
  upsertModelTitle.value = 'Add Friend';
  upsertFormApi.resetForm();
  modelApi.open();
}

function onRowEdit(row: any) {
  editRowId.value = row.id;
  upsertModelTitle.value = 'Edit Friend';
  upsertFormApi.setValues(row);
  modelApi.open();
}

async function onRowDelete(row: any) {
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
  <Model>
    <UpsertForm />
  </Model>
  <Grid>
    <template #toolbar-tools>
      <div class="flex gap-2">
        <Button type="primary" @click="onAdd()">
          <MaterialSymbolsAddRounded class="!text-[16px]" />
        </Button>
        <Button type="primary">
          <MaterialSymbolsSearchRounded class="!text-[16px]" />
        </Button>
      </div>
    </template>

    <template #fullname="{ row }">
      {{ `${row.firstname} ${row.lastname}` }}
    </template>

    <template #wechatId="{ row }">
      {{ row.wechatId || 'N/A' }}
    </template>

    <template #birthDate="{ row }">
      {{ row.birthDate || '-' }}
    </template>

    <template #acquaintanceDate="{ row }">
      {{ row.acquaintanceDate || '-' }}
    </template>

    <template #action="{ row }">
      <div class="flex gap-2">
        <Button size="small" type="primary" ghost @click="onRowEdit(row)">
          Edit
        </Button>
        <Button
          size="small"
          type="primary"
          ghost
          danger
          @click="onRowDelete(row)"
        >
          Delete
        </Button>
      </div>
    </template>
  </Grid>
</template>
