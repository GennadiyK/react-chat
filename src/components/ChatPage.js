import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Toolbar, TextField, Drawer } from '@material-ui/core/';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import ExploreIcon from '@material-ui/icons/Explore';
import ChatList from "./ChatList";
import SearchField from "./SearchField";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import Modal from "./Modal";
import  ErrorMessage from './ErrorMessage'

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
    chatName: null,
    activeTab: 0,
  };

  componentDidMount() {
    const {
      match,
      fetchAllChats,
      fetchMyChats,
      socketsConnect,
      mountChat,
    } = this.props;

    Promise.all([
      fetchAllChats(),
      fetchMyChats(),
    ]).then(() => {
      socketsConnect();
    }).then(() => {
      const { chatId } = match.params;

      if( chatId ) {
        mountChat(chatId);
      }

    });
  }

  componentWillReceiveProps(nextProps) {
    const { match: {params}, unmountChat, mountChat } = this.props;
    const {params: nextParams} = nextProps.match;

    if(nextParams.chatId && params.chatId !==  nextParams.chatId) {
      unmountChat(params.chatId);
      mountChat(nextParams.chatId);
    }
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

  handleChange = (event, value) => {
    this.setState({
      activeTab: value,
    });
  };

  render() {
    const {
      classes,
      chats,
      logout,
      activeUser,
      sendMessage,
      setActiveChat,
      deleteChat,
      leaveChat,
      joinChat,
      searchChat,
      messages,
      error,
      isConnected,
    } = this.props;

    const { activeTab } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <ChatHeader
            isConnected={isConnected}
            showModal={this.handleClickConfirmModal}
            deleteChat={deleteChat}
            leaveChat={leaveChat}
            activeChat={chats.active}
            activeUser={activeUser}
          />
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <Toolbar className={classes.asideToolbar}>
              <SearchField searchChat={searchChat}/>
            </Toolbar>
            <ChatList
              chats={activeTab === 0 ? chats.my : chats.all}
              setActiveChat={setActiveChat}
              showCreateChatModal={this.handleClickCreateChatModal}
              disabled={!isConnected}
            />
            <BottomNavigation
              value={activeTab}
              onChange={this.handleChange}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction label="My chats" icon={<RestoreIcon />} disabled={!isConnected}/>
              <BottomNavigationAction label="Explore" icon={<ExploreIcon />} disabled={!isConnected}/>
            </BottomNavigation>
          </Drawer>
          <MessageContainer
            sendMessage={sendMessage}
            onJoinButtonClick={joinChat}
            activeUser={activeUser}
            chats={chats}
            messages={messages}
            isConnected={isConnected}
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
        <ErrorMessage error={error}/>
      </div>

    )
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);