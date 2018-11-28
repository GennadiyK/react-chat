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
      },
      confirmPassword: {
        value: '',
        isValid: true,
      }
    };


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit (e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (!this.validate()) {
      return;
    }


    this.props.onSubmit(username.value, password.value);
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

  validate = () => {
    const { password, confirmPassword } = this.state;
    const isValid = password.value === confirmPassword.value;

    this.setState({
      password: { ...password, isValid },
      confirmPassword: { ...confirmPassword, isValid },
    });

    return isValid;
  }
  render() {
    const { classes } = this.props;
    const { username, password, confirmPassword } = this.state;

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
          id="signin-password-input"
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
        <TextField
          id="signin-repeat-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          required={true}
          fullWidth={true}
          onChange={this.handleInputChange}
          value={confirmPassword.value}
          name="confirmPassword"
          error={!confirmPassword.isValid}
        />
        <Button className={classes.btn} fullWidth={true} variant="contained" color="primary" type="submit">
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