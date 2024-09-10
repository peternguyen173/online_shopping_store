import axiosCLient from './axiosClient';

const categoryApi = {
    getAll() {
        const url = '/categories';
        return axiosCLient.get(url);
    },
};

export default categoryApi;
