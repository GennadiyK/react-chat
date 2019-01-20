import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Header from './Header';
import ErrorMessage from './ErrorMessage';

const styles = theme => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    maxWidth: '500px',
    margin: '25px auto 0',
  },
  containerInner: {
    padding: '25px',
  },
});

class WelcomePage extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {
      classes, signup, login, isAuthenticated, error,
    } = this.props;
    const { value } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/chat" />;
    }

    return (
      <React.Fragment>
        <Header />
        <Card className={classes.container}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              fullWidth
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          <CardContent className={classes.containerInner}>
            {value === 0 && <LoginForm onSubmit={login} />}
            {value === 1 && <SignUpForm onSubmit={signup} />}
          </CardContent>
        </Card>
        <ErrorMessage error={error} />
      </React.Fragment>
    );
  }
}

WelcomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error).isRequired,
};

export default withStyles(styles)(WelcomePage);
