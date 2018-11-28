import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  createChat, deleteChat
} from "../actions/chats";
import {logout} from "../actions/auth";
import ChatPage from '../components/ChatPage';
import * as fromChats from '../reducers/chats'


const matStateToProps = state => {
  console.log('state.chats.activeId', state)
  return {
    chats: fromChats.getByIds(state.chats, state.chats.allIds),
    activeChat: state.chats.activeChat || state.chats.allIds[0]
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  createChat,
  deleteChat,
  logout
}, dispatch);

export default connect(
  matStateToProps,
  mapDispatchToProps
)(ChatPage)
