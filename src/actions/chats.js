import callApi from '../utils/call-api';
import {redirect} from './services'
import * as types from '../constants'

export function fetchMyChats () {
  return (dispatch, getState) => {
    const {token} = getState().auth;
    dispatch({
      type: types.FETCH_MY_CHATS_REQUEST
    });

    return callApi('/chats/my', token)
      .then((data) => {
          dispatch({
            type: types.FETCH_MY_CHATS_SUCCESS,
            payload: data
          })
      })
      .catch((err) => {
        dispatch({
          type: types.FETCH_MY_CHATS_FAILURE,
          payload: err
        })
      })
  }
}

export function fetchAllChats () {
  return (dispatch, getState) => {
    const {token} = getState().auth;
    dispatch({
      type: types.FETCH_ALL_CHATS_REQUEST
    });

    return callApi('/chats', token)
      .then((data) => {
        dispatch({
          type: types.FETCH_ALL_CHATS_SUCCESS,
          payload: data
        });


      })
      .catch((err) => {
        dispatch({
          type: types.FETCH_ALL_CHATS_FAILURE,
          payload: err
        })
      })
  }
}

export function fetchChat (chatId) {
  return (dispatch, getState) => {
    const {token} = getState().auth;
    dispatch({
      type: types.FETCH_CHAT_REQUEST
    });

    return callApi(`/chats/${chatId}`, token)
      .then((data) => {
        dispatch({
          type: types.FETCH_CHAT_SUCCESS,
          payload: data
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: types.FETCH_CHAT_FAILURE,
          payload: err
        });
      })
  }
}

export function setActiveChat (chatId) {
  return (dispatch) => {
    dispatch(fetchChat(chatId))
      .then((data) => {
        if(!data) {
          dispatch(redirect('/chat'));

          return dispatch({
            type: types.UNSET_ACTIVE_CHAT
          })
        }
        dispatch({
          type: types.SET_ACTIVE_CHAT,
          payload: data
        })

        return dispatch(redirect(`/chat/${data.chat._id}`))
      });

  }
}

export function createChat(payload) {
  return (dispatch, getState) => {
    const {token} = getState().auth;
    dispatch({
      type: types.CREATE_CHAT_REQUEST
    });

    return callApi('chats', token, {method: 'POST'}, payload).then((data) => {
      dispatch({
        type: types.CREATE_CHAT_SUCCESS,
        payload: data
      });

      dispatch(redirect(`/chat/${data.chat._id}`));

      return data;
    }).catch((err) => {
      console.log(err)
      dispatch({
        type: types.CREATE_CHAT_FAILURE,
        payload: err
      })
    })
  }
}

export function joinChat(chatId) {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: types.JOIN_CHAT_REQUEST
    });

    return callApi(`chats/${chatId}/join`, token).then((data) => {
        dispatch({
          type: types.JOIN_CHAT_SUCCESS,
          payload: data
        });

        dispatch(redirect(`/chat/${data.chat._id}`));
        dispatch(fetchChat(chatId));

        return data;
      }).catch((err) => {
        dispatch({
          type: types.JOIN_CHAT_FAILURE,
          payload: err
        });
      })
  }
}

export function leaveChat(chatId) {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: types.LEAVE_CHAT_REQUEST
    });

    return callApi(`chats/${chatId}/leave`, token).then((data) => {
      dispatch({
        type: types.LEAVE_CHAT_SUCCESS,
        payload: data
      });

      dispatch({
        type: types.UNSET_ACTIVE_CHAT,
      });

      return data;
    }).catch((err) => {
      dispatch({
        type: types.LEAVE_CHAT_FAILURE,
        payload: err
      })
    })
  }
}

export function deleteChat(id) {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: types.DELETE_CHAT_REQUEST
    });

    return callApi(`chats/${id}`, token, {method: 'DELETE'}).then((data) => {

      dispatch({
        type: types.DELETE_CHAT_SUCCESS,
        payload: data
      });

      dispatch({
        type: types.UNSET_ACTIVE_CHAT,
      });

      dispatch(redirect(`chat`));

      return data;
    }).catch((err) => {
      dispatch({
        type: types.DELETE_CHAT_FAILURE,
        payload: err
      })
    })
  }
}


export function sendMessage(chatId, payload) {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: types.SEND_MESSAGE_REQUEST
    });

    return callApi(`chats/${chatId}`, token, {method: 'POST'}, { data: {content: payload}}).then((data) => {
      dispatch({
        type: types.SEND_MESSAGE_SUCCESS,
        payload: {
          message: data.message
        }
      });

      dispatch(fetchChat(chatId));

      return data;
    }).catch((err) => {
      dispatch({
        type: types.SEND_MESSAGE_FAILURE,
        payload: err
      })
    })
  }
}

export function searchChat(searchValue) {
  return (dispatch) => {
    dispatch({
      type: types.SEARCH_CHAT,
      payload: {searchValue: searchValue.toLowerCase()}
    })
  }
}