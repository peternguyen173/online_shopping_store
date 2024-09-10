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
    GET_ALL_CUSTOMERS_SUCCESS,
    GET_ADMIN_REQUEST,
    GET_ADMIN_SUCCESS,
    GET_ADMIN_FAILURE,
    SET_ERROR,
    GET_USER_PROFILE_SUCCESS,
} from './ActionTypes';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    userProfiles: null,
    customers: [],
    admin: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, error: null };

        case REGISTER_SUCCESS:
            return { ...state, isLoading: false };
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false };
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null, fetchingUser: true };
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                fetchingUser: false,
            };
        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userProfiles: action.payload,
                fetchingUser: false,
            };
        case GET_ALL_CUSTOMERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                customers: action.payload,
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                fetchingUser: false,
            };
        case GET_ADMIN_REQUEST:
            return { ...state, isLoading: true, error: null, fetchingAdmin: true };
        case GET_ADMIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                fetchingAdmin: false,
            };
        case GET_ADMIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                admin: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: null,
            };
        case LOGOUT:
            localStorage.removeItem('jwt');
            return { ...state, jwt: null, user: null };
        default:
            return state;
    }
};

export default authReducer;
