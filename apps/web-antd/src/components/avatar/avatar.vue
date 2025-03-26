<script setup>
import { defineProps, onMounted, ref } from 'vue';

import { useVModel } from '@vueuse/core';
import { message, Upload } from 'ant-design-vue';

import { uploadFileApi } from '#/api/modules/upload';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const modelValue = useVModel(props, 'modelValue', emit);

const fileList = ref([]);

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  return isJpgOrPng;
};

const handleChange = (info) => {
  let files = [...info.fileList];
  files = files.slice(-1); // Keep only the latest file
  fileList.value = files;
  if (info.file.status === 'done') {
    // Assuming the response contains the URL of the uploaded image
    modelValue.value = info.file.response.url;
  }
};

const handlePreview = (file) => {
  window.open(
    `http://localhost:3000/${file.url || file.response.url}`,
    '_blank',
  );
};

const customRequest = async (options) => {
  const res = await uploadFileApi(options.file);

  options.onSuccess(res);
  modelValue.value = res.url;
  fileList.value = [
    {
      uid: '-1',
      name: 'avatar.png',
      status: 'done',
      url: `http://localhost:3000/${modelValue.value}`,
    },
  ];
};
onMounted(() => {
  if (modelValue.value) {
    fileList.value = [
      {
        uid: '-1',
        name: 'avatar.png',
        status: 'done',
        url: `http://localhost:3000/${modelValue.value}`,
      },
    ];
  }
});
</script>

<template>
  <Upload
    list-type="picture-card"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :on-change="handleChange"
    :custom-request="customRequest"
    :on-preview="handlePreview"
  >
    Upload
  </Upload>
</template>
