import { combineReducers } from 'redux';
import * as types from '../constants';

const initialState = {
  isFetching: {
    signup: false,
    login: false,
    logout: false,
    receiveAuth: false,
    myChats: false,
    allChats: false,
    chat: false,
    createChat: false,
    joinChat: false,
    leaveChat: false,
    deleteChat: false,
    sockets: false,
    editUser: false,
  },
  errors: {
    auth: null,
    chat: null,
  },
  isConnected: false,
};

export const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return { ...state, signup: true };
    case types.LOGIN_REQUEST:
      return { ...state, login: true };
    case types.LOGOUT_REQUEST:
      return { ...state, logout: true };
    case types.RECEIVE_AUTH_REQUEST:
      return { ...state, receiveAuth: true };
    case types.FETCH_MY_CHATS_REQUEST:
      return { ...state, myChats: true };
    case types.FETCH_ALL_CHATS_REQUEST:
      return { ...state, allChats: true };
    case types.FETCH_CHAT_REQUEST:
      return { ...state, chat: true };
    case types.CREATE_CHAT_REQUEST:
      return { ...state, createChat: true };
    case types.JOIN_CHAT_REQUEST:
      return { ...state, joinChat: true };
    case types.LEAVE_CHAT_REQUEST:
      return { ...state, leaveChat: true };
    case types.DELETE_CHAT_REQUEST:
      return { ...state, deleteChat: true };
    case types.SOCKET_CONNECTION_REQUEST:
      return { ...state, sockets: true };
    case types.SIGNUP_SUCCESS:
    case types.SIGNUP_FAILURE:
      return { ...state, signup: false };
    case types.LOGIN_SUCCESS:
    case types.LOGIN_FAILURE:
      return { ...state, login: false };
    case types.LOGOUT_SUCCESS:
    case types.LOGOUT_FAILURE:
      return { ...state, logout: false };
    case types.RECEIVE_AUTH_SUCCESS:
    case types.RECEIVE_AUTH_FAILURE:
      return { ...state, receiveAuth: false };
    case types.FETCH_MY_CHATS_SUCCESS:
    case types.FETCH_MY_CHATS_FAILURE:
      return { ...state, myChats: false };
    case types.FETCH_ALL_CHATS_SUCCESS:
    case types.FETCH_ALL_CHATS_FAILURE:
      return { ...state, allChats: false };
    case types.FETCH_CHAT_SUCCESS:
    case types.FETCH_CHAT_FAILURE:
      return { ...state, chat: false };
    case types.CREATE_CHAT_SUCCESS:
    case types.CREATE_CHAT_FAILURE:
      return { ...state, createChat: false };
    case types.JOIN_CHAT_SUCCESS:
    case types.JOIN_CHAT_FAILURE:
      return { ...state, joinChat: false };
    case types.LEAVE_CHAT_SUCCESS:
    case types.LEAVE_CHAT_FAILURE:
      return { ...state, leaveChat: false };
    case types.DELETE_CHAT_SUCCESS:
    case types.DELETE_CHAT_FAILURE:
      return { ...state, deleteChat: false };
    case types.SOCKET_CONNECTION_SUCCESS:
    case types.SOCKET_CONNECTION_FAILURE:
      return { ...state, sockets: false };
    default:
      return state;
  }
};

export const errors = (state = initialState.errors, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
    case types.LOGOUT_SUCCESS:
      // case types.RECEIVE_AUTH_SUCCESS:
      return { ...state, auth: null };
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.LOGOUT_FAILURE:
      // case types.RECEIVE_AUTH_FAILURE:
      return { ...state, auth: action.payload };
    case types.FETCH_MY_CHATS_FAILURE:
    case types.FETCH_ALL_CHATS_FAILURE:
    case types.FETCH_CHAT_FAILURE:
    case types.CREATE_CHAT_FAILURE:
    case types.JOIN_CHAT_FAILURE:
    case types.LEAVE_CHAT_FAILURE:
    case types.DELETE_CHAT_FAILURE:
    case types.SOCKET_CONNECTION_FAILURE:
      return { ...state, chat: action.payload };
    case types.FETCH_MY_CHATS_SUCCESS:
    case types.FETCH_ALL_CHATS_SUCCESS:
    case types.FETCH_CHAT_SUCCESS:
    case types.CREATE_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
    case types.LEAVE_CHAT_SUCCESS:
    case types.DELETE_CHAT_SUCCESS:
    case types.SOCKET_CONNECTION_SUCCESS:
      return { ...state, chat: null };
    default:
      return state;
  }
};

export const isConnected = (state = initialState.isConnected, action) => {
  switch (action.type) {
    case types.SOCKET_CONNECTION_FAILURE:
    case types.SOCKET_CONNECTION_MISSING:
      return false;
    case types.SOCKET_CONNECTION_SUCCESS:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  errors,
  isConnected,
});
