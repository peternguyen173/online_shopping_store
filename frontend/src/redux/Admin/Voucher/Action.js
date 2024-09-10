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
import api, { API_BASE_URL } from '../../../config/api';

export const getAllVouchers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_VOUCHER_REQUEST });

        const { data } = await api.get(`${API_BASE_URL}/api/admin/discounts`);

        dispatch({
            type: GET_VOUCHER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_VOUCHER_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const createVoucher = (voucher) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_VOUCHER_REQUEST });

        const { data } = await api.post(`${API_BASE_URL}/api/admin/discounts`, voucher.data, {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${voucher.jwt}`,
            },
        });

        dispatch({
            type: CREATE_VOUCHER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_VOUCHER_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const updateVoucher = (voucher, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_VOUCHER_REQUEST });

        const { data } = await api.put(`${API_BASE_URL}/api/admin/discounts/${id}`, voucher);

        dispatch({
            type: UPDATE_VOUCHER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_VOUCHER_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteVoucher = (data) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_VOUCHER_REQUEST });

        await api.delete(`/api/admin/discounts/${data.discountCodeId}`);

        dispatch({
            type: DELETE_VOUCHER_SUCCESS,
            payload: data.discountCodeId,
        });
    } catch (error) {
        dispatch({
            type: DELETE_VOUCHER_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
