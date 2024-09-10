import {
    ADD_MESSAGE_FAILURE,
    ADD_MESSAGE_FULFILLED,
    ADD_MESSAGE_REQUEST,
    GET_CONTACTED_FAILURE,
    GET_CONTACTED_FULFILLED,
    GET_CONTACTED_REQUEST,
    GET_MESSAGES_FAILURE,
    GET_MESSAGES_FULFILLED,
    GET_MESSAGES_REQUEST,
} from './ActionTypes';

// Initial State
const initialState = {
    messages: [],
    contacted: [],
    isLoading: false,
    error: null,
    fetchingMessage: false,
};

// Reducer
export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case ADD_MESSAGE_FULFILLED:
            return {
                ...state,
                messages: [...state.messages, action.payload],
                isLoading: false,
            };
        case ADD_MESSAGE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case GET_MESSAGES_REQUEST:
            return {
                ...state,
                isLoading: true,
                fetchingMessage: true,
                error: null,
            };
        case GET_MESSAGES_FULFILLED:
            return {
                ...state,
                messages: action.payload,
                isLoading: false,
                fetchingMessage: false,
            };
        case GET_MESSAGES_FAILURE:
            return {
                ...state,
                isLoading: false,
                fetchingMessage: false,
                error: action.payload,
            };
        case GET_CONTACTED_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case GET_CONTACTED_FULFILLED:
            return {
                ...state,
                contacted: action.payload,
                isLoading: false,
            };
        case GET_CONTACTED_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
