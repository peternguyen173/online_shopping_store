import axiosCLient from './axiosClient';

const cartApi = {
    getAll(jwt) {
        const url = '/api/cart';
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        };
        return axiosCLient.get(url, config);
    },
};

export default cartApi;
