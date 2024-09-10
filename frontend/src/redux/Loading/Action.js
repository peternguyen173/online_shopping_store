const { SET_LOADING } = require('./ActionType');

export const setLoading = (bool) => ({ type: SET_LOADING, payload: bool });
