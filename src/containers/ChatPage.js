import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  createChat
} from "../actions/chats";
import {logout} from "../actions/auth";
import ChatPage from '../components/ChatPage';
import * as fromChats from '../reducers/chats'


const matStateToProps = state => {
  console.log('fromChats', fromChats)
  return {
    chats: fromChats.getByIds(state.chats, state.chats.allIds)
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  createChat,
  logout
}, dispatch);

export default connect(
  matStateToProps,
  mapDispatchToProps
)(ChatPage)
