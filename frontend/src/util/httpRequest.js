import axios from 'axios';
import { API_BASE_URL } from '~/config/api';

const httpRequest = axios.create({
    baseURL: API_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;
