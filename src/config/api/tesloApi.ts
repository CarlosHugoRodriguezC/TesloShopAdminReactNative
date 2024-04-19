import {API_URL, API_URL_ANDROID, API_URL_IOS, STAGE} from '@env';
import axios from 'axios';
import {Platform} from 'react-native';
import {StorageAdapter} from '../adapters/storge-adapter';

export const BASE_API_URL =
  STAGE !== 'prod'
    ? Platform.OS === 'ios'
      ? API_URL_IOS
      : API_URL_ANDROID
    : API_URL;

const tesloApi = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/// Interceptors

tesloApi.interceptors.request.use(async config => {
  const token = await StorageAdapter.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export {tesloApi};
