import SocketIOClient from 'socket.io-client';
import * as types from '../constants';
import { redirect } from './services';
import chats from "../reducers/chats";

export function missingSocketConnection () {
  return {
    types: types.SOCKET_CONNECTION_MISSING
  }
}

let socket = null;

export function socketsConnect () {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({
      type: types.SOCKET_CONNECTION_REQUEST
    });

    socket = SocketIOClient(`ws://${process.env.REACT_APP_URL}`, {
      query: { token }
    });

    socket.on('connect', () => {
      dispatch({
        type: types.SOCKET_CONNECTION_SUCCESS,
      })
    });

    socket.on('error', (err) => {
      dispatch({
        type: types.SOCKET_CONNECTION_FAILURE,
        payload: err,
      })
    });

    socket.on('connect_error', (err) => {
      dispatch({
        type: types.SOCKET_CONNECTION_FAILURE,
        payload: err,
      })
    });

    socket.on('new-message', (message) => {
      dispatch({
        type: types.RECEIVE_MESSAGE,
        payload: message,
      })
    });
    socket.on('new-chats', ({ chat }) => {
      dispatch({
        type: types.RECEIVE_NEW_CHAT,
        payload: chat,
      })
    });
    socket.on('deleted-chat', ({ chat }) => {
      const { activeId } = getState().chats;
      dispatch({
        type: types.RECEIVE_DELETED_CHAT,
        payload: chat,
      });

      if(activeId === chat._id) {
        dispatch(redirect('/chat'));
      }
    });
  }
}

export function sendMessage (content) {
  return (dispatch, getState) => {
    const { activeId } = getState().chats;
    if(!socket) {
      dispatch(missingSocketConnection())
    }

    socket.emit(
      'send-message',
      {
        chatId: activeId,
        content,
      },
      () => {
        console.log('dispatch SEND_MESSAGE');
        dispatch({
          type: types.SEND_MESSAGE,
          payload: {
            chatId: activeId,
            content,
          },
        });
      },
    );
  }
}

export function mountChat (chatId) {
  return (dispatch, getState) => {
    if(!socket) {
      dispatch(missingSocketConnection())
    }

    socket.emit('mount-chat', chatId)

    dispatch({
      type: types.MOUNT_CHAT,
      payload: { chatId },
    });
  }
}

export function unmountChat (chatId) {
  return (dispatch, getState) => {
    if(!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('unmount-chat', chatId);

    dispatch({
      type: types.UNMOUNT_CHAT,
      payload: { chatId },
    });
  }
}
