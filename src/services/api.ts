import axios from 'axios';

const api = axios.create({
  baseURL: 'https://icods-api.com.br',
});

export default api;