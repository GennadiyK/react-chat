import * as types from '../constants/auth'

export function signup (username, password) {
  return (dispatch) => {
    dispatch({
      type: types.SIGNUP_REQUEST
    });

    return fetch('http://localhost:8000/v1/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then((json) => {
      if(json.success) {
        return json;
      }

      throw new Error(json.message)
    })
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
  return (dispatch) => {
    dispatch({
      type: types.LOGIN_REQUEST
    });

    return fetch('http://localhost:8000/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then((json) => {
        if(json.success) {
          return json;
        }

        throw new Error(json.message)
      })
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
  return (dispatch) => {
    dispatch({
      type: types.LOGOUT_REQUEST
    })
  }
}

export function receiveAuth () {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch({
      type: types.RECEIVE_AUTH_REQUEST,
    });

    if(!token) {
      dispatch({
        type: types.RECEIVE_AUTH_FAILURE
      })
    }

    return fetch('http://localhost:8000/v1/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((json) => {
        if(json.success) {
          return json;
        }

        throw new Error(json.message)
      })
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