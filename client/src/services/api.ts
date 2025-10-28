import axios from 'axios';
import type { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 或其他认证信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API 错误:', error);
    return Promise.reject(error);
  }
);

// API 方法
export const api = {
  // 用户相关
  getUser: (fingerprint: string): Promise<User> => {
    return apiClient.get(`/users/${fingerprint}`);
  },

  createUser: (data: Partial<User>): Promise<User> => {
    return apiClient.post('/users', data);
  },

  updateUser: (fingerprint: string, data: Partial<User>): Promise<User> => {
    return apiClient.put(`/users/${fingerprint}`, data);
  },

  // 游戏相关
  getGameRoom: (roomId: string): Promise<any> => {
    return apiClient.get(`/game/${roomId}`);
  },

  joinGame: (roomId: string, data: { fingerprint: string }): Promise<any> => {
    return apiClient.post(`/game/${roomId}/join`, data);
  },

  leaveGame: (roomId: string, data: { fingerprint: string }): Promise<any> => {
    return apiClient.post(`/game/${roomId}/leave`, data);
  },
};

export default api;

