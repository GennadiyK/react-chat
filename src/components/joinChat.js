import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  joinChat: {
    padding: '1rem'
  },
});

const JoinChat = ({classes, onJoinButtonClick, disabled}) => {
  return (
    <Paper className={classes.joinChat}>
      <Button
        size="large"
        color="primary"
        variant="contained"
        fullWidth={true}
        onClick={onJoinButtonClick}
        disabled={disabled}
      >
        JOIN
      </Button>
    </Paper>
  )
};

export default withStyles(styles)(JoinChat);