import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import SimpleBottomNavigation from './BottomNavigation';
import ChatList from "./ChatList";
import SearchField from "./SearchField";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import { messages } from '../mock-data'
import ConfirmModal from "./ConfirmModal";

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
    open: false,
  };

  componentDidMount() {
    const {
      fetchAllChats,
      fetchMyChats,
    } = this.props;

    Promise.all([
      fetchAllChats(),
      fetchMyChats()
    ]);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      chats,
      logout
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <ChatHeader showModal={this.handleClickOpen}/>
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
            <ChatList chats={chats}/>
            <SimpleBottomNavigation/>
          </Drawer>
          <MessageContainer messages={messages}/>
          <ConfirmModal
            isOpen={this.state.open}
            handleClose={this.handleClose}
            handleConfirm={logout}
            title={'Confirm logout'}
            text={'Do you want to logout?'}/>
        </div>
      </div>
    )
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);