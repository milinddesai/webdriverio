import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1'
   }
});

export default {
  async getUsers(page = 1) {
    return api.get(`/users?page=${page}`);
  },
  async createUser(payload: object) {
    return api.post('/users', payload);
  }
};
