import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { GET_NOTIFICATIONS_FAILURE, GET_NOTIFICATIONS_FULFILLED, GET_NOTIFICATIONS_REQUEST } from './ActionTypes';

export const getNotifications = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_NOTIFICATIONS_REQUEST });
        try {
            const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_NOTIFICATIONS_FULFILLED, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_NOTIFICATIONS_FAILURE, payload: error });
        }
    };
};
