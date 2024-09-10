import api from '../../../config/api';
import {
    canceledOrderFailure,
    canceledOrderRequest,
    canceledOrderSuccess,
    confirmedOrderFailure,
    confirmedOrderRequest,
    confirmedOrderSuccess,
    deleteOrderFailure,
    deleteOrderRequest,
    deleteOrderSuccess,
    deliveredOrderFailure,
    deliveredOrderRequest,
    deliveredOrderSuccess,
    shipOrderRequest,
    shipOrderSuccess,
    shipOrderFailure,
    getAllRevenueRequest,
    getAllRevenueSuccess,
    getAllRevenueFailure,
    getAllOrdersSuccess,
    getAllOrdersRequest,
    getAllOrdersFailure,
    confirmPaymentRequest,
    confirmPaymentSuccess,
    confirmPaymentFailure,
} from './ActionCreator';

// export const getOrders = (reqData) => {
//     console.log('get all orders ', reqData);
//     return async (dispatch) => {
//         dispatch(getOrdersRequest());
//         try {
//             const response = await api.get(`/api/admin/orders`);
//             console.log('get all orders ', response.data);
//             dispatch(getOrdersSuccess(response.data));
//         } catch (error) {
//             console.log('catch error ', error);
//             dispatch(getOrdersFailure(error.message));
//         }
//     };
// };

export const getAllOrders = (reqData) => {
    console.log('get all orders ', reqData);
    return async (dispatch) => {
        dispatch(getAllOrdersRequest());
        try {
            const response = await api.get(`/api/admin/orders`);
            dispatch(getAllOrdersSuccess(response.data));
        } catch (error) {
            dispatch(getAllOrdersFailure(error.message));
        }
    };
};

export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch(confirmedOrderRequest());

    try {
        const response = await api.put(`/api/admin/orders/${orderId}/confirm`);
        const data = response.data;
        console.log('confirm_order ', data);
        dispatch(confirmedOrderSuccess(data));
    } catch (error) {
        dispatch(confirmedOrderFailure(error.message));
    }
};

export const shipOrder = (orderId) => {
    return async (dispatch) => {
        try {
            dispatch(shipOrderRequest());
            const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
            console.log(' shipped order', data);
            dispatch(shipOrderSuccess(data));
        } catch (error) {
            dispatch(shipOrderFailure(error.message));
        }
    };
};

export const deliveredOrder = (orderId) => async (dispatch) => {
    dispatch(deliveredOrderRequest());

    try {
        const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
        const data = response.data;
        console.log('dilivered order ', data);
        dispatch(deliveredOrderSuccess(data));
    } catch (error) {
        dispatch(deliveredOrderFailure(error.message));
    }
};

export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch(canceledOrderRequest());

    try {
        const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
        const data = response.data;
        dispatch(canceledOrderSuccess(data));
    } catch (error) {
        dispatch(canceledOrderFailure(error.message));
    }
};

// Async action creator for deleting an order
export const deleteOrder = (orderId) => {
    return async (dispatch) => {
        dispatch(deleteOrderRequest());
        try {
            const { data } = await api.delete(`/api/admin/orders/${orderId}/delete`);
            console.log('delete order ', data);
            dispatch(deleteOrderSuccess(orderId));
        } catch (error) {
            console.log('catch error ', error);
            dispatch(deleteOrderFailure(error));
        }
    };
};

export const confirmPayment = (orderId) => async (dispatch) => {
    dispatch(confirmPaymentRequest());

    try {
        const response = await api.put(`/api/admin/orders/${orderId}/payment`);
        const data = response.data;
        dispatch(confirmPaymentSuccess(data));
    } catch (error) {
        dispatch(confirmPaymentFailure(error.message));
    }
};

export const getAllRevenue = () => {
    return async (dispatch) => {
        dispatch(getAllRevenueRequest());
        try {
            const response = await api.get(`/api/admin/orders/all-revenue`);
            dispatch(getAllRevenueSuccess(response.data));
        } catch (error) {
            console.log('catch error ', error);
            dispatch(getAllRevenueFailure(error.message));
        }
    };
};
