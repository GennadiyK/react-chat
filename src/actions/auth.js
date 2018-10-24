import {
  SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS,
  LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS,
  LOGOUT_REQUEST, LOGOUT_FAILURE, LOGOUT_SUCCESS
} from '../constants/auth'

export function signup (username, password) {
  return (dispatch) => {
    dispatch({
      type: SIGNUP_REQUEST
    })

    return fetch('http://localhost:8000/v1/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })
    .then(response => response.json())
    .then((json) => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: json
      })
    })
    .catch((err) => {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: err
      })
    });
  }
}

export function login (username, password) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST
    });

    return fetch('http://localhost:8000/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })
      .then(response => response.json())
      .then((json) => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: json
        })
      })
      .catch((err) => {
        dispatch({
          type: SIGNUP_FAILURE,
          payload: err
        })
      });
  }
}

export function logout () {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST
    })
  }
}