import axios from 'axios';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT,
    GET_ALL_CUSTOMERS_REQUEST,
    GET_ALL_CUSTOMERS_SUCCESS,
    GET_ALL_CUSTOMERS_FAILURE,
    GET_ADMIN_REQUEST,
    GET_ADMIN_SUCCESS,
    GET_ADMIN_FAILURE,
    SET_ERROR,
    GET_USER_PROFILE_SUCCESS,
} from './ActionTypes';
import axiosClient, { API_BASE_URL } from '../../config/api';

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        if (user.jwt) localStorage.setItem('jwt', user.jwt);
        console.log('registered :- ', user);
        dispatch(registerSuccess(user));
    } catch (error) {
        console.log('error ', error);
        dispatch(registerFailure(error.response.data));
    }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

            export const login = (userData) => async (dispatch) => {
                dispatch(loginRequest());
                try {
                    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
                    const user = response.data;
                    if (user.jwt) localStorage.setItem('jwt', user.jwt);
                    console.log('login ', user);
                    dispatch(loginSuccess(user));
                } catch (error) {
                    dispatch(loginFailure(error.response.data));
                }
            };

//  get user from token
export const getAllCustomers = (token) => {
    return async (dispatch) => {
        console.log('jwt - ', token);
        dispatch({ type: GET_ALL_CUSTOMERS_REQUEST });
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const users = response.data;
            dispatch({ type: GET_ALL_CUSTOMERS_SUCCESS, payload: users });
            console.log('All Customers', users);
        } catch (error) {
            const errorMessage = error.message;
            console.log(error);
            dispatch({ type: GET_ALL_CUSTOMERS_FAILURE, payload: errorMessage });
        }
    };
};

export const getUser = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_REQUEST });
        try {
            const response = await axios.get(`${API_BASE_URL}/api/user/account/user-details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const user = response.data;
            dispatch({ type: GET_USER_SUCCESS, payload: user[0] });
            console.log('req User ', user[0]);
        } catch (error) {
            const errorMessage = error.message;
            dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
        }
    };
};

export const getUserProfiles = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_REQUEST });
        try {
            const response = await axios.get(`${API_BASE_URL}/api/user/account/user-details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const users = response.data;
            dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: users });
            console.log('req UserProfiles ', users);
        } catch (error) {
            const errorMessage = error.message;
            dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
        }
    };
};

export const getAdmin = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ADMIN_REQUEST });
        try {
            const response = await axios.get(`${API_BASE_URL}/users/1`);
            const admin = response.data;
            dispatch({ type: GET_ADMIN_SUCCESS, payload: admin });
            console.log('req Admin ', admin);
        } catch (error) {
            const errorMessage = error.message;
            dispatch({ type: GET_ADMIN_FAILURE, payload: errorMessage });
        }
    };
};

export const resetError = () => {
    return async (dispatch) => {
        dispatch({ type: SET_ERROR });
    };
};

export const logout = (token) => {
    return async (dispatch) => {
        dispatch({ type: LOGOUT });
        localStorage.clear();
    };
};
