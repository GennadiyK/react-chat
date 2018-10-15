import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  btn: {
    marginTop: '16px'
  }
});


class SignInForm extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <form noValidate autoComplete="off">
        <TextField
          id="signin-username-input"
          label="Username*"
          type="text"
          autoComplete="current-name"
          margin="normal"
          fullWidth={true}
        />
        <TextField
          id="signin-password-input"
          label="Password*"
          type="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth={true}
        />
        <TextField
          id="signin-repeat-password-input"
          label="Password*"
          type="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth={true}
        />
        <Button className={classes.btn} fullWidth={true} variant="contained" color="primary">
          signup
        </Button>
      </form>
    );
  }
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInForm);