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

  constructor() {
    super()

    this.state = {
      username: {
        value: '',
        isValid: true,
      },
      password: {
        value: '',
        isValid: true,
      }
    };


   this.handleInputChange = this.handleInputChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleInputChange(e) {
    e.persist()
    const { name, value} = e.target;
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        value
      }
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    console.log(username.value, password.value)
  }

  render() {
    const { classes } = this.props;
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="signin-username-input"
          label="Username"
          type="text"
          autoComplete="current-name"
          margin="normal"
          required={true}
          fullWidth={true}
          onChange={this.handleInputChange}
          value={username.value}
          name="username"
          error={!username.isValid}
        />
        <TextField
          id="login-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          required={true}
          fullWidth={true}
          onChange={this.handleInputChange}
          value={password.value}
          name="password"
          error={!password.isValid}
        />
        <Button className={classes.btn} fullWidth={true} variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    );
  }
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInForm);