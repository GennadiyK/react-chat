import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  chatMessageWrap: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    paddingTop: '24px',
    paddingBottom: '179px'
  },
  chatMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '8px 24px',
  },
  chatMessageMe: {
    flexDirection: 'row-reverse',
  },
  chatListPaper: {
    marginLeft: '16px',
    marginRight: '16px',
    padding: '6px',
    maxWidth: '70%',
    minWidth: '10%',
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
    const { classes } = this.props;

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
          <div className={classNames(classes.chatMessage, classes.chatMessageMe)}>
            <Avatar>G</Avatar>
            <Paper className={classes.chatListPaper} elevation={3}>
              <Typography  component="span">
                Gennadiy
              </Typography>
              <Typography  variant={'body2'} component="p">
                How are you?
              </Typography>
              <Typography variant={'caption'} component="span">
                a few seconds ago
              </Typography>
            </Paper>
          </div>
          <div className={classNames(classes.chatMessage)}>
            <Avatar>G</Avatar>
            <Paper className={classes.chatListPaper} elevation={3}>
              <Typography  component="span">
                Gennadiy
              </Typography>
              <Typography  variant={'body2'} component="p">
                How are you?
              </Typography>
              <Typography variant={'caption'} component="span">
                a few seconds ago
              </Typography>
            </Paper>
          </div>
          <div className={classNames(classes.chatMessage)}>
            <Avatar>G</Avatar>
            <Paper className={classes.chatListPaper} elevation={3}>
              <Typography  component="span">
                Gennadiy
              </Typography>
              <Typography  variant={'body2'} component="p">
                How are you?
              </Typography>
              <Typography variant={'caption'} component="span">
                a few seconds ago
              </Typography>
            </Paper>
          </div>
        </div>
        <div className={classes.textFieldWrap}>
          <Paper  elevation={3} className={classes.textFieldPaper}>
            <TextField
              placeholder="Type your message..."
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Paper>
        </div>
      </main>
    )
  }
}

MessageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageContainer);