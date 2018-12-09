import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  textFieldPaper: {
    padding: '1rem'
  },
});


class MessageInput extends React.Component {

  render() {
    const { classes } = this.props;

    return (
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
    )
  }
}

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageInput);