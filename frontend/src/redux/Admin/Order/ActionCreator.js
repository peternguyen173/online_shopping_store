import {
    CANCELED_ORDER_FAILURE,
    CANCELED_ORDER_REQUEST,
    CANCELED_ORDER_SUCCESS,
    CONFIRMED_ORDER_FAILURE,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    SHIP_ORDER_FAILURE,
    SHIP_ORDER_REQUEST,
    SHIP_ORDER_SUCCESS,
    GET_ALL_REVENUE_FAILURE,
    GET_ALL_REVENUE_REQUEST,
    GET_ALL_REVENUE_SUCCESS,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAILURE,
    CONFIRM_PAYMENT_REQUEST,
    CONFIRM_PAYMENT_SUCCESS,
    CONFIRM_PAYMENT_FAILURE,
} from './ActionType';

export const getOrdersRequest = () => {
    return {
        type: GET_ORDERS_REQUEST,
    };
};

export const getOrdersSuccess = (orders) => {
    return {
        type: GET_ORDERS_SUCCESS,
        payload: orders,
    };
};

export const getOrdersFailure = (error) => {
    return {
        type: GET_ORDERS_FAILURE,
        payload: error,
    };
};

// Action creators for confirmed order
export const confirmedOrderRequest = () => ({
    type: CONFIRMED_ORDER_REQUEST,
});

export const confirmedOrderSuccess = (data) => ({
    type: CONFIRMED_ORDER_SUCCESS,
    payload: data,
});

export const confirmedOrderFailure = (error) => ({
    type: CONFIRMED_ORDER_FAILURE,
    payload: error,
});

export const confirmPaymentRequest = () => ({
    type: CONFIRM_PAYMENT_REQUEST,
});

export const confirmPaymentSuccess = (data) => ({
    type: CONFIRM_PAYMENT_SUCCESS,
    payload: data,
});

export const confirmPaymentFailure = (error) => ({
    type: CONFIRM_PAYMENT_FAILURE,
    payload: error,
});

// Action creators for delivered order
export const deliveredOrderRequest = () => ({
    type: DELIVERED_ORDER_REQUEST,
});

export const deliveredOrderSuccess = (data) => ({
    type: DELIVERED_ORDER_SUCCESS,
    payload: data,
});

export const deliveredOrderFailure = (error) => ({
    type: DELIVERED_ORDER_FAILURE,
    payload: error,
});

// Action creators for canceled order
export const canceledOrderRequest = () => ({
    type: CANCELED_ORDER_REQUEST,
});

export const canceledOrderSuccess = (data) => ({
    type: CANCELED_ORDER_SUCCESS,
    payload: data,
});

export const canceledOrderFailure = (error) => ({
    type: CANCELED_ORDER_FAILURE,
    payload: error,
});

// Action creators for deleting an order
export const deleteOrderRequest = () => ({
    type: DELETE_ORDER_REQUEST,
});

export const deleteOrderSuccess = (orderId) => ({
    type: DELETE_ORDER_SUCCESS,
    payload: orderId,
});

export const deleteOrderFailure = (error) => ({
    type: DELETE_ORDER_FAILURE,
    payload: error,
});

export const shipOrderRequest = () => ({
    type: SHIP_ORDER_REQUEST,
});

export const shipOrderSuccess = (data) => ({
    type: SHIP_ORDER_SUCCESS,
    payload: data,
});

export const shipOrderFailure = (error) => ({
    type: SHIP_ORDER_FAILURE,
    payload: error,
});

export const getAllRevenueRequest = () => ({
    type: GET_ALL_REVENUE_REQUEST,
});

export const getAllRevenueSuccess = (data) => ({
    type: GET_ALL_REVENUE_SUCCESS,
    payload: data,
});

export const getAllRevenueFailure = (error) => ({
    type: GET_ALL_REVENUE_FAILURE,
    payload: error,
});

export const getAllOrdersRequest = () => ({
    type: GET_ALL_ORDERS_REQUEST,
});

export const getAllOrdersSuccess = (data) => ({
    type: GET_ALL_ORDERS_SUCCESS,
    payload: data,
});

export const getAllOrdersFailure = (error) => ({
    type: GET_ALL_ORDERS_FAILURE,
    payload: error,
});
