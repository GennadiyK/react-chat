import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Message from "./Message";
import MessageInput from "./MessageInput";

const styles = theme => ({
  chatMessageWrap: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    paddingTop: '24px',
    paddingBottom: '179px'
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
    display: 'none',
  },
  textFieldWrap: {
    left: '320px',
    right: 0,
    bottom: 0,
    padding: '24px',
    position: 'fixed',
  },
  textFieldPaper: {
    padding: '16px'
  },
});


class MessageContainer extends React.Component {

  render() {
    const { classes, messages } = this.props;

    return (
      <main className={classes.content}>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="display1" component="h3" gutterBottom={true}>
            Start messaging…
          </Typography>
          <Typography component="p" gutterBottom={true}>
            Use <strong>Global</strong> to explore communities around here.
          </Typography>
          <Typography component="p" gutterBottom={true}>
            Use <strong>Recents</strong> to see your recent conversations.
          </Typography>
        </Paper>
        <div className={classes.chatMessageWrap}>
          {messages && messages.map((message, index) =>
            <Message key={index} {...message}/>
          )}
        </div>
        <div className={classes.textFieldWrap}>
          <MessageInput/>
        </div>
      </main>
    )
  }
}

MessageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageContainer);