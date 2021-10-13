import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-3-231-207-105.compute-1.amazonaws.com:3333',
});

export default api;