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

  render() {
    const {
      classes,
      chats
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <ChatHeader/>
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
        </div>
      </div>
    )
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);