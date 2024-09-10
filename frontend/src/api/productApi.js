import axiosCLient from './axiosClient';

const productApi = {
    getAll() {
        const url = '/products';
        return axiosCLient.get(url);
    },
    getOne(id) {
        const url = `/products/${id}`;
        return axiosCLient.get(url);
    },
};

export default productApi;
