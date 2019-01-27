/* eslint no-underscore-dangle: 0 */
import SocketIOClient from 'socket.io-client';
import * as types from '../constants';
import { redirect } from './services';
import config from '../config';

export function missingSocketConnection() {
  return {
    types: types.SOCKET_CONNECTION_MISSING,
    payload: new Error('Missing connection!'),
  };
}

let socket = null;

export function socketsConnect() {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.sockets) {
      return Promise.resolve();
    }

    const { token } = getState().auth;
    dispatch({
      type: types.SOCKET_CONNECTION_REQUEST,
    });

    socket = SocketIOClient(`${config.SOCKETS_URI}`, {
      query: { token },
    });

    socket.on('connect', () => {
      dispatch({
        type: types.SOCKET_CONNECTION_SUCCESS,
      });
    });

    socket.on('error', (err) => {
      dispatch({
        type: types.SOCKET_CONNECTION_FAILURE,
        payload: new Error(`Connection: ${err}`),
      });
    });

    socket.on('connect_error', () => {
      dispatch({
        type: types.SOCKET_CONNECTION_FAILURE,
        payload: new Error('We have lost connection'),
      });
    });

    socket.on('new-message', (message) => {
      dispatch({
        type: types.RECEIVE_MESSAGE,
        payload: message,
      });
    });
    socket.on('new-chats', ({ chat }) => {
      dispatch({
        type: types.RECEIVE_NEW_CHAT,
        payload: chat,
      });
    });
    socket.on('deleted-chat', (data) => {
      const { activeId } = getState().chats;
      const { chat } = data;
      dispatch({
        type: types.RECEIVE_DELETED_CHAT,
        payload: data,
      });

      if (activeId === chat._id) {
        dispatch(redirect('/chat'));
      }
    });
    return Promise.resolve();
  };
}

export function sendMessage(content) {
  return (dispatch, getState) => {
    const { activeId } = getState().chats;
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit(
      'send-message',
      {
        chatId: activeId,
        content,
      },
      () => {
        dispatch({
          type: types.SEND_MESSAGE,
          payload: {
            chatId: activeId,
            content,
          },
        });
      },
    );
  };
}

export function mountChat(chatId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('mount-chat', chatId);

    dispatch({
      type: types.MOUNT_CHAT,
      payload: { chatId },
    });
  };
}

export function unmountChat(chatId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('unmount-chat', chatId);

    dispatch({
      type: types.UNMOUNT_CHAT,
      payload: { chatId },
    });
  };
}
