import {
  SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS,
  LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS,
  LOGOUT_REQUEST, LOGOUT_FAILURE, LOGOUT_SUCCESS
} from '../constants/auth'


const initialState = {
  isAuthenticated: false,
  user: {},
  token: ''
};

export default function auth (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return state;
      break;
    default:
      return state;
  }
}