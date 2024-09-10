import {
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
} from './ActionType';
import api, { API_BASE_URL } from '../../../config/api';

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_USERS_REQUEST });

        const { data } = await api.get(`${API_BASE_URL}/api/admin/users`);

        const usersArray = Array.isArray(data) ? data : [];

        dispatch({
            type: GET_ALL_USERS_SUCCESS,
            payload: usersArray,
        });
        
    } catch (error) {
        dispatch({
            type: GET_ALL_USERS_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteUser = (data) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        await api.delete(`/api/admin/users/${data.userId}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.userId,
        });

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
