<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import FriendGrid from './grid.vue';
</script>

<template>
  <Page class="h-full" :auto-content-height="true">
    <!-- grid-rows-1 -->
    <!-- grid-rows-[40%,_60%] -->
    <div class="grid h-full grid-cols-1 grid-rows-1 gap-2">
      <FriendGrid />
    </div>
  </Page>
</template>

<style scoped></style>
