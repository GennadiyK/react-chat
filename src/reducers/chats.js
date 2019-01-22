/* eslint no-use-before-define: 0 */
/* eslint no-underscore-dangle: 0 */
import { combineReducers } from 'redux';
import * as types from '../constants';

const initialState = {
  activeId: null,
  allIds: [],
  myIds: [],
  byIds: {},
  searchValue: '',
};

const activeId = (state = initialState.activeId, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
    case types.JOIN_CHAT_SUCCESS:
      return getChatId(action.payload.chat);
    case types.UNSET_ACTIVE_CHAT:
    case types.DELETE_CHAT_SUCCESS:
    case types.LOGOUT_SUCCESS:
      return null;
    case types.RECEIVE_DELETED_CHAT:
      return state === getChatId(action.payload.chat) ? null : state;
    default:
      return state;
  }
};
const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.CREATE_CHAT_SUCCESS:
    case types.RECEIVE_NEW_CHAT:
      return [...state, getChatId(action.payload.chat)];
    case types.DELETE_CHAT_SUCCESS:
    case types.RECEIVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));
    default:
      return state;
  }
};
const myIds = (state = initialState.myIds, action) => {
  switch (action.type) {
    case types.FETCH_MY_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.CREATE_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
      return [...state, getChatId(action.payload.chat)];
    case types.LEAVE_CHAT_SUCCESS:
    case types.DELETE_CHAT_SUCCESS:
    case types.RECEIVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));
    default:
      return state;
  }
};
const byIds = (state = initialState.byIds, action) => {
  let newState;
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
    case types.FETCH_MY_CHATS_SUCCESS:
      return {
        ...state,
        ...action.payload.chats.reduce(
          (ids, chat) => ({
            ...ids,
            [getChatId(chat)]: chat,
          }),
          {},
        ),
      };
    case types.CREATE_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
    case types.LEAVE_CHAT_SUCCESS:
    case types.RECEIVE_NEW_CHAT:
      return {
        ...state,
        [getChatId(action.payload.chat)]: action.payload.chat,
      };
    case types.DELETE_CHAT_SUCCESS:
    case types.RECEIVE_DELETED_CHAT:
      newState = { ...state };
      delete newState[getChatId(action.payload.chat)];
      return newState;
    default:
      return state;
  }
};

const searchValue = (state = initialState.searchValue, action) => {
  switch (action.type) {
    case types.SEARCH_CHAT:
      return action.payload.searchValue;
    default:
      return state;
  }
};

export default combineReducers({
  activeId,
  allIds,
  myIds,
  byIds,
  searchValue,
});

export const getActiveUser = state => state.auth.user;
export const getUserId = user => user._id;
export const isCreator = (state, chat) => {
  try {
    return getUserId(chat.creator) === getUserId(getActiveUser(state));
  } catch (err) {
    return false;
  }
};

export const isMember = (state, chat) => {
  try {
    return chat.members.some(member => getUserId(member) === getUserId(getActiveUser(state)));
  } catch (err) {
    return false;
  }
};

export const isChatMember = (state, chat) => isCreator(state, chat) || isMember(state, chat);

export const getChatId = chat => chat._id;
export const getById = (state, id) => state.byIds[id];
export const getByIds = (state, ids) => ids.map(id => state.byIds[id]);
