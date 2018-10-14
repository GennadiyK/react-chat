import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import SimpleBottomNavigation from './BottomNavigation';
import ChatList from "./ChatList";
import SearchField from "./SearchField";

const styles = theme => ({
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


function ChatContainer ({ classes, chats }) {
  return (
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
  )
}

ChatContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatContainer);