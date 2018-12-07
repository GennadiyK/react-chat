import * as types from '../constants';

const initialState = [];

export default  (state = initialState, action) => {
  switch(action.type) {
    case types.SEND_MESSAGE_SUCCESS:
      return [...state, action.payload.message];
    case types.FETCH_ALL_CHATS_SUCCESS:
      return action.payload.chat.message
    default:
      return state;
  }
}