import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Toolbar, TextField, Drawer } from '@material-ui/core/';
import SimpleBottomNavigation from './BottomNavigation';
import ChatList from "./ChatList";
import SearchField from "./SearchField";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import { messages } from '../mock-data'
import Modal from "./Modal";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  drawerPaper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    width: '320px',
  },
  asideToolbar: {
    borderBottom: '1px solid  rgba(0, 0, 0, 0.12)',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
});


class ChatPage extends React.Component {
  state = {
    confirmModalOpen: false,
    createChatModalOpen: false,
    chatName: null
  };

  componentDidMount() {
    const {
      fetchAllChats,
      fetchMyChats,
    } = this.props;

    Promise.all([
      fetchAllChats(),
      fetchMyChats(),
    ]);
  }

  handleClickConfirmModal = () => {
    this.setState({ confirmModalOpen: true });
  };

  handleClickCreateChatModal = () => {
    this.setState({ createChatModalOpen: true });
  };

  handleCloseConfirmModal = () => {
    this.setState({ confirmModalOpen: false });
  };

  handleCloseCreateChatModal = () => {
    this.setState({ createChatModalOpen: false });
  };

  handleChangeNewChatField = (event) => {
    this.setState({
      chatName: event.target.value
    })
  }

  handleCreateChat = () => {
    this.props.createChat({
      data:{
        title: this.state.chatName
      }
    })

    this.handleCloseCreateChatModal()
  };

  render() {
    console.log('state||||||', this.props)
    const {
      classes,
      chats,
      logout,
      activeUser,
      sendMessage,
      setActiveChat,
      deleteChat,
      joinChat,
    } = this.props;

    console.log('chats', chats)
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <ChatHeader showModal={this.handleClickConfirmModal} deleteChat={deleteChat} activeChat={chats.active} />
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <Toolbar className={classes.asideToolbar}>
              <SearchField/>
            </Toolbar>
            <ChatList
              chats={chats}
              setActiveChat={setActiveChat}
              showCreateChatModal={this.handleClickCreateChatModal}
            />
            <SimpleBottomNavigation/>
          </Drawer>
          <MessageContainer
            sendMessage={(content) => sendMessage(chats.active._id, content)}
            onJoinButtonClick={joinChat}
            activeUser={activeUser}
          />
          <Modal
            isOpen={this.state.createChatModalOpen}
            handleClose={this.handleCloseCreateChatModal}
            handleConfirm={this.handleCreateChat}
            title={'Create new chat'}
          >
            <TextField
              id="standard-textarea"
              label="New Chat"
              placeholder="Type the title..."
              multiline
              className={classes.textField}
              margin="normal"
              onChange={this.handleChangeNewChatField}
            />
          </Modal>
          <Modal
            isOpen={this.state.confirmModalOpen}
            handleClose={this.handleCloseConfirmModal}
            handleConfirm={logout}
            title={'Confirm logout'}
          >
            <p>Do you want to logout?</p>
          </Modal>
        </div>
      </div>
    )
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);