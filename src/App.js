import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './components/Header'
import ChatContainer from './components/ChatContainer';
import MessageContainer from "./components/MessageContainer";
import { chats, messages } from './mock-data'


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

class PermanentDrawer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header/>
          <ChatContainer chats={chats}/>
          <MessageContainer messages={messages}/>
        </div>
      </div>
    );
  }
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
