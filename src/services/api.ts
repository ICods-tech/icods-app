import axios from 'axios';
const {API_URL} = process.env;

const api = axios.create({
  baseURL: `http://10.0.2.2:3333`
});

export default api;