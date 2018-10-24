import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SignUpForm from './SignUpForm';
import LoginForm from "./LoginForm";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from "@material-ui/core/AppBar";

const styles = theme => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    maxWidth: '500px',
    margin: '25px auto 0'
  },
  containerInner: {
    padding: '25px'
  }
});


class WelcomeContainer extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, signup, login } = this.props;
    const { value } = this.state;

    return (
      <Card className={classes.container}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
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
          {value === 0 && <LoginForm onSubmit={login}/>}
          {value === 1 && <SignUpForm onSubmit={signup}/>}
        </CardContent>
      </Card>
    );
  }
}

WelcomeContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WelcomeContainer);