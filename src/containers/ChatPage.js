import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  createChat,
  deleteChat,
  joinChat,
  leaveChat,
  sendMessage,
} from "../actions/chats";
import {logout} from "../actions/auth";
import ChatPage from '../components/ChatPage';
import * as fromChats from '../reducers/chats';


const matStateToProps = state => {
  const activeChat = fromChats.getById(state.chats, state.chats.activeId)

  return {
    isAuthenticated: state.auth.isAuthenticated,
    chats: {
      active: activeChat,
      my: fromChats.getByIds(state.chats, state.chats.myIds),
      all: fromChats.getByIds(state.chats, state.chats.allIds),
    },
    activeUser: {
      ...state.auth.user,
      isMember: fromChats.isMember(state, activeChat),
      isCreator: fromChats.isCreator(state, activeChat),
      isChatMember: fromChats.isChatMember(state, activeChat),
    },
    messages: state.messages,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  createChat,
  deleteChat,
  leaveChat,
  logout,
  joinChat,
  sendMessage,
}, dispatch);

export default connect(
  matStateToProps,
  mapDispatchToProps
)(ChatPage)
