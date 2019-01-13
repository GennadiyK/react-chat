/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from './Avatar';
import titleInitials from '../utils/title-initial';

import randomColor from '../utils/color-from';

const styles = () => ({
  chatMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '8px 24px',
  },
  chatMessageMe: {
    flexDirection: 'row-reverse',
  },
  chatMessageInner: {
    marginLeft: '16px',
    marginRight: '16px',
    padding: '6px',
    maxWidth: '70%',
    minWidth: '10%',
  },
  statusMessage: {
    textAlign: 'center',
  },
  statusMessageItem: {
    display: 'inline',
  },
});

function Message({
  classes, sender, content, statusMessage, createdAt, activeUser,
}) {
  if (statusMessage) {
    return (
      <div className={classes.statusMessage}>
        <Typography
          style={{ color: randomColor(sender._id) }}
          variant="caption"
          component="span"
          className={classes.statusMessageItem}
        >
          {sender.username}
        </Typography>
        <Typography variant="body2" component="span" className={classes.statusMessageItem}>
          {content}
        </Typography>
        <Typography variant="caption" component="div">
          {moment(createdAt).fromNow()}
        </Typography>
      </div>
    );
  }
  return (
    <div
      className={
        sender._id === activeUser._id
          ? classNames(classes.chatMessage, classes.chatMessageMe)
          : classes.chatMessage
      }
    >
      <Avatar colorFrom={sender._id}>{titleInitials(sender.username)}</Avatar>
      <Paper className={classes.chatMessageInner} elevation={3}>
        <Typography variant="caption" component="span" style={{ color: randomColor(sender._id) }}>
          {sender.username}
        </Typography>
        <Typography variant="body2" component="p">
          {content}
        </Typography>
        <Typography variant="caption" component="span">
          {moment(createdAt).fromNow()}
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Message);
