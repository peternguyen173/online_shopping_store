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

const initialState = {
    loading: false,
    orders: [],
    error: '',
    allRevenue: '',
};

const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: '',
            };
        case GET_ALL_ORDERS_FAILURE:
            return {
                loading: false,
                orders: [],
                error: action.payload,
            };
        case CONFIRMED_ORDER_REQUEST:
        case CONFIRM_PAYMENT_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case CANCELED_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case CONFIRMED_ORDER_SUCCESS:
            return {
                ...state,
                confirmed: action.payload,
                isLoading: false,
            };

        case CONFIRM_PAYMENT_SUCCESS:
            return {
                ...state,
                confirmed_payment: action.payload,
                isLoading: false,
            };
        case DELIVERED_ORDER_SUCCESS:
            return {
                ...state,
                delivered: action.payload,
                isLoading: false,
            };
        case CANCELED_ORDER_SUCCESS:
            return {
                ...state,
                canceled: action.payload,
                isLoading: false,
            };

        case CONFIRMED_ORDER_FAILURE:
        case CONFIRM_PAYMENT_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case CANCELED_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case DELETE_ORDER_REQUEST:
            return { ...state, loading: true };
        case DELETE_ORDER_SUCCESS:
            return { ...state, loading: false, orders: state.orders.filter((order) => order.id !== action.payload) };
        case DELETE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case SHIP_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case SHIP_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                shipped: action.payload,
            };
        case SHIP_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case GET_ALL_REVENUE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case GET_ALL_REVENUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allRevenue: action.payload,
            };

        case GET_ALL_REVENUE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default adminOrderReducer;
