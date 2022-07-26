import axios from 'axios';
const { API_URL } = process.env;

const api = axios.create({
  baseURL: `https://icods-api.com.br`
});

export default api;