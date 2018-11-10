import * as types from '../constants';
import {combineReducers} from 'redux';

const initialState = {
  activeId: '',
  allIds: [],
  myIds: [],
  byIds:{},
};

const  activeId = (state = initialState.activeId, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
      return action.payload.chat._id;
    case types.UNSET_ACTIVE_CHAT:
      return '';
    default:
      return state;
  }
};
const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    default:
      return state;
  }
};
const  myIds = (state = initialState.myIds, action) => {
  switch (action.type) {
    case types.FETCH_MY_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    default:
      return state;
  }
};
const byIds = (state = initialState.byIds, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
    case types.FETCH_MY_CHATS_SUCCESS:
      return {
        ...state,
        ...action.payload.chats.reduce((ids, chat) => {
          return {
            ...ids,
            [chat._id]: chat
          }
        }, {})
      };
    default:
      return state;
  }
};

export default combineReducers({
  activeId,
  allIds,
  myIds,
  byIds
})


export const getChatId = (chat) => chat._id;
export const getByIds = (state, ids) => {
  return ids.map(id => {
    return state.byIds[id]
  });
}