<script setup lang="ts">
import { h } from 'vue';

import Name from './Name.vue';
</script>

<template>
  <div>
    <h1 class="text-lg font-bold">Hello World</h1>
    <component :is="h(Name, $attrs, $slots)" />
  </div>
</template>
