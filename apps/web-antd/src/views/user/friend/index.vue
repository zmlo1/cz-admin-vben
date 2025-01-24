<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

import FriendTable from './table.vue';
</script>

<template>
  <Page title="Friend">
    <Card class="h-full">
      <FriendTable />
    </Card>
  </Page>
</template>

<style scoped></style>
