import * as types from '../constants/auth'
import callApi from '../utils/call-api';

export function signup (username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if(isFetching.signUp) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SIGNUP_REQUEST
    });

    return callApi('signup',undefined, {method: 'POST'},{username,password})
    .then((json) => {
      if(!json.token) {
        throw new Error('Token has not been provided');
      }
      localStorage.setItem('token', json.token);
      dispatch({
        type: types.SIGNUP_SUCCESS,
        payload: json
      })
    })
    .catch((err) => {
      dispatch({
        type: types.SIGNUP_FAILURE,
        payload: err
      })
    });
  }
}

export function login (username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if(isFetching.login) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGIN_REQUEST
    });

    return callApi('login',undefined, {method: 'POST'},{username, password})
      .then((json) => {
        if(!json.token) {
          throw new Error('Token has not been provided');
        }
        localStorage.setItem('token', json.token);
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: json
        })
      })
      .catch((err) => {
        dispatch({
          type: types.LOGIN_FAILURE,
          payload: err
        })
      });
  }
}

export function logout () {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if(isFetching.logout) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGOUT_REQUEST
    });

    return callApi('logout')
      .then((json) => {
        localStorage.removeItem('token');

        dispatch({
          type: types.LOGOUT_SUCCESS,
          payload: json
        })
      })
      .catch((err) => {
        dispatch({
          type: types.LOGOUT_FAILURE,
          payload: err
        })
      })
  }
}

export function receiveAuth () {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if(isFetching.receiveAuth) {
      return Promise.resolve();
    }

    const { token } = getState().auth;

    dispatch({
      type: types.RECEIVE_AUTH_REQUEST,
    });

    if(!token) {
      dispatch({
        type: types.RECEIVE_AUTH_FAILURE
      })
    }

    return callApi('users/me', token)
      .then((json) => {
        dispatch({
          type: types.RECEIVE_AUTH_SUCCESS,
          payload: json
        })
      })
      .catch((err) => {
        dispatch({
          type: types.RECEIVE_AUTH_FAILURE,
          payload: err
        })
      });
  }
}