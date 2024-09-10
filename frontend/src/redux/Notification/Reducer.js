import { GET_NOTIFICATIONS_FAILURE, GET_NOTIFICATIONS_FULFILLED, GET_NOTIFICATIONS_REQUEST } from './ActionTypes';

// Initial State
const initialState = {
    notifications: [],
    isLoading: false,
    error: null,
};

// Reducer
export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                isLoading: true,
                fetchingMessage: true,
                error: null,
            };
        case GET_NOTIFICATIONS_FULFILLED:
            return {
                ...state,
                notifications: action.payload,
                isLoading: false,
            };
        case GET_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
