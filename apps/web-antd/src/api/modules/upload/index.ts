import { requestClient } from '#/api/request';

export const uploadFileApi = (file: File) => {
  return requestClient.request('/upload', {
    method: 'POST',
    data: {
      file,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
