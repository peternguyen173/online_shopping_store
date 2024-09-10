import * as httpRequest from '~/util/httpRequest';

export const search = async (productName) => {
    try {
        //call api
        const res = await httpRequest.get('products/search', {
            params: {
                productName,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
