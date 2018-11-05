import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAllChats, fetchMyChats, setActiveChat } from "../actions/chats";
import ChatPage from '../components/ChatPage';
import * as fromChats from '../reducers/chats'

const matStateToProps = state => {
  return {
    chats: fromChats.getByIds(state.chats, state.chats.allIds)
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllChats,
  fetchMyChats,
  setActiveChat
}, dispatch);


export default connect(
  matStateToProps,
  mapDispatchToProps
)(ChatPage)
