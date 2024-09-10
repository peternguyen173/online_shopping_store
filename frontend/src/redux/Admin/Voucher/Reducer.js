import {
    GET_VOUCHER_REQUEST,
    GET_VOUCHER_SUCCESS,
    GET_VOUCHER_FAILURE,
    CREATE_VOUCHER_REQUEST,
    CREATE_VOUCHER_SUCCESS,
    CREATE_VOUCHER_FAILURE,
    UPDATE_VOUCHER_REQUEST,
    UPDATE_VOUCHER_SUCCESS,
    UPDATE_VOUCHER_FAILURE,
    DELETE_VOUCHER_REQUEST,
    DELETE_VOUCHER_SUCCESS,
    DELETE_VOUCHER_FAILURE,
} from './ActionType';

const initialState = {
    vouchers: [],
    loading: false,
    error: null,
};

const voucherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VOUCHER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_VOUCHER_SUCCESS:
            return {
                ...state,
                loading: false,
                vouchers: action.payload,
            };
        case GET_VOUCHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CREATE_VOUCHER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_VOUCHER_SUCCESS:
            return {
                ...state,
                loading: false,
                vouchers: [...state.vouchers, action.payload],
            };
        case CREATE_VOUCHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_VOUCHER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_VOUCHER_SUCCESS:
            return {
                ...state,
                loading: false,
                vouchers: state.vouchers.map((voucher) =>
                    voucher._id === action.payload._id ? action.payload : voucher,
                ),
            };
        case UPDATE_VOUCHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_VOUCHER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_VOUCHER_SUCCESS:
            return {
                ...state,
                loading: false,
                vouchers: state.vouchers.filter((voucher) => voucher._id !== action.payload),
            };
        case DELETE_VOUCHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default voucherReducer;
