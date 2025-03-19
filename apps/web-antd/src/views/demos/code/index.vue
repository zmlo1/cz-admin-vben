<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

import HelloWorld from './HelloWorld.vue';
</script>

<template>
  <Page title="Code Demos">
    <Card>
      <HelloWorld>
        <template #default="{ msg }">
          <span>DriftInRush --- {{ msg }}</span>
        </template>
      </HelloWorld>
    </Card>
  </Page>
</template>
