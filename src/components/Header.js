import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    flexGrow: 1,
  },
};

const Header = ({classes}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
          React Chat
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);