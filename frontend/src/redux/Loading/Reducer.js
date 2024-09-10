import { SET_LOADING } from './ActionType';

// Initial State
const initialState = {
    isLoading: false,
};

// Reducer
export default function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
}
