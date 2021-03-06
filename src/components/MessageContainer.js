/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Message from './Message';
import MessageInput from './MessageInput';
import JoinChat from './joinChat';

const styles = theme => ({
  chatMessageWrap: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    paddingTop: '24px',
    paddingBottom: '179px',
  },
  'appBar-left': {
    marginLeft: '320px',
  },
  'appBar-right': {
    marginRight: '320px',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '64px',
    height: '100%',
  },
  paper: {
    padding: '24px',
  },
  textFieldWrap: {
    left: '320px',
    right: 0,
    bottom: 0,
    padding: '24px',
    position: 'fixed',
  },
  textFieldPaper: {
    padding: '16px',
  },
});

class MessageContainer extends React.Component {
  componentDidMount() {
    this.fixScrollBottom();
  }

  componentDidUpdate() {
    this.fixScrollBottom();
  }

  fixScrollBottom() {
    if (this.chatWrapRef) {
      this.chatWrapRef.scrollTop = this.chatWrapRef.scrollHeight;
    }
  }

  render() {
    const {
      classes,
      messages,
      chats,
      activeUser,
      onJoinButtonClick,
      sendMessage,
      isConnected,
    } = this.props;

    return (
      <main className={classes.content}>
        {!chats.active && (
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="display1" component="h3" gutterBottom>
              Start messaging…
            </Typography>
            <Typography component="p" gutterBottom>
              Use
              {' '}
              <strong>Global</strong>
              {' '}
to explore communities around here.
            </Typography>
            <Typography component="p" gutterBottom>
              Use
              {' '}
              <strong>Recents</strong>
              {' '}
to see your recent conversations.
            </Typography>
          </Paper>
        )}
        {Boolean(messages.length) && Boolean(chats.active) && (
          <div
            className={classes.chatMessageWrap}
            ref={(el) => {
              this.chatWrapRef = el;
            }}
          >
            {messages.map(message => (
              <Message key={message._id} {...message} activeUser={activeUser} />
            ))}
          </div>
        )}
        {chats.active && (
          <div className={classes.textFieldWrap}>
            {activeUser.isChatMember ? (
              <MessageInput sendMessage={sendMessage} desabled={!isConnected} />
            ) : (
              <JoinChat
                disabled={!isConnected}
                onJoinButtonClick={() => onJoinButtonClick(chats.active._id)}
              />
            )}
          </div>
        )}
      </main>
    );
  }
}
MessageContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  messages: PropTypes.array.isRequired,
  chats: PropTypes.object.isRequired,
  activeUser: PropTypes.object.isRequired,
  onJoinButtonClick: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MessageContainer);
