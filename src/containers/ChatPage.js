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
  searchChat,
} from "../actions/chats";
import {logout} from "../actions/auth";
import ChatPage from '../components/ChatPage';
import * as fromChats from '../reducers/chats';
import { filterChats } from '../utils/filter';


const matStateToProps = state => {
  const activeChat = fromChats.getById(state.chats, state.chats.activeId);
  const chatsMy = fromChats.getByIds(state.chats, state.chats.myIds);
  const chatsAll = fromChats.getByIds(state.chats, state.chats.allIds);

  return {
    isAuthenticated: state.auth.isAuthenticated,
    chats: {
      active: activeChat,
      my: filterChats(chatsMy, state.chats.searchValue),
      all: filterChats(chatsAll, state.chats.searchValue),
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
  searchChat,
}, dispatch);

export default connect(
  matStateToProps,
  mapDispatchToProps
)(ChatPage)
