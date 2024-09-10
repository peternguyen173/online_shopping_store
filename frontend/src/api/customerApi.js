import axiosCLient from './axiosClient';

const customerApi = {
    getAll(params) {
        const url = '/users';
        return axiosCLient.get(url, { params });
    },
    get(id) {
        const url = `/users/${id}`;
        return axiosCLient.get(url);
    },
    add(data) {
        const url = `/users`;
        return axiosCLient.post(url, data);
    },
    // update(data) {
    //     const url = `/users/${data.id}`;
    //     return axiosCLient.patch(url, data);
    // },
    delete(id) {
        const url = `/users/${id}`;
        return axiosCLient.delete(url);
    },
};

export default customerApi;
