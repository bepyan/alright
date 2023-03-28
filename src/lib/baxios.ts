import axios from 'axios';

const baxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
});

export default baxios;
