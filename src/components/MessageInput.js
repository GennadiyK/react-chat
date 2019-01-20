import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
  textFieldPaper: {
    padding: '1rem',
  },
});

class MessageInput extends React.Component {
  state = {
    value: '',
  };

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSendMessage = (e) => {
    const { value } = this.state;
    const { sendMessage } = this.props;
    if (e.key === 'Enter' && value) {
      sendMessage(value);
      this.setState({
        value: '',
      });
    }
  };

  render() {
    const { classes, disabled } = this.props;
    console.log(this.props);
    const { value } = this.state;

    return (
      <Paper elevation={3} className={classes.textFieldPaper}>
        <TextField
          placeholder="Type your message..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={value}
          onChange={this.handleValueChange}
          onKeyPress={this.handleSendMessage}
          disabled={disabled}
        />
      </Paper>
    );
  }
}
MessageInput.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  sendMessage: PropTypes.func.isRequired,
};

MessageInput.defaultProps = {
  disabled: null,
};

export default withStyles(styles)(MessageInput);
