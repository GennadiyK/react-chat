import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChatHeader from '../ChatHeader'
import ChatContainer from '../ChatContainer';
import MessageContainer from "../MessageContainer";
import { chats, messages } from '../../mock-data'

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
});

const ChatPage = ({classes}) => {
  return (<div className={classes.root}>
    <div className={classes.appFrame}>
      <ChatHeader/>
      <ChatContainer chats={chats}/>
      <MessageContainer messages={messages}/>
    </div>
  </div>)
};

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);