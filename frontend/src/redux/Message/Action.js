import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import {
    ADD_MESSAGE_FULFILLED,
    GET_CONTACTED_FAILURE,
    GET_CONTACTED_FULFILLED,
    GET_CONTACTED_REQUEST,
    GET_MESSAGES_FAILURE,
    GET_MESSAGES_FULFILLED,
    GET_MESSAGES_REQUEST,
} from './ActionTypes';

export const addMessage = (message) => ({ type: ADD_MESSAGE_FULFILLED, payload: message });

export const getMessages = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_MESSAGES_REQUEST });
        try {
            const response = await axios.get(`${API_BASE_URL}/api/message/get-user-message`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_MESSAGES_FULFILLED, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_MESSAGES_FAILURE, payload: error });
        }
    };
};

export const getContacted = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_CONTACTED_REQUEST });
        try {
            const response = await axios.get(`${API_BASE_URL}/api/message/contact-list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_CONTACTED_FULFILLED, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_CONTACTED_FAILURE, payload: error.response.data });
        }
    };
};
