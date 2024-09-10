import axios from 'axios';
const LOCALHOST = 'http://localhost:8080';

export const API_BASE_URL = LOCALHOST;

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

const token = localStorage.getItem('jwt');

console.log('token', token);
// token

axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axiosClient.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosClient;
