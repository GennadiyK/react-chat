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
  state = {
    value: ''
  };

  handleValueChange = (e) => {
    this.setState({value: e.target.value})
  };

  handleSendMessage = (e) => {
    const { value } = this.state;

    if (e.key === 'Enter' && value) {
      this.props.sendMessage(value);
      this.setState({
        value: ''
      });
    }
  };

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
          value={this.state.value}
          onChange={this.handleValueChange}
          onKeyPress={this.handleSendMessage}
        />
      </Paper>
    )
  }
}

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageInput);