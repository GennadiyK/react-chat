import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import SimpleBottomNavigation from './components/BottomNavigation'
import Paper from '@material-ui/core/Paper';
import FolderList from "./components/FolderList";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - 320px)`,
  },
  'appBar-left': {
    marginLeft: '320px',
  },
  'appBar-right': {
    marginRight: '320px',
  },
  drawerPaper: {
    position: 'relative',
    width: '320px',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: '24px'
  }

});

class PermanentDrawer extends React.Component {
  state = {
    anchor: 'left',
  };

  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                React chat
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor={anchor}
          >
            <div className={classes.toolbar} />

            <FolderList/>
            <SimpleBottomNavigation/>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="display1" component="h3" gutterBottom={true}>
                Start messaging…
              </Typography>
              <Typography component="p" gutterBottom={true}>
                Use <strong>Global</strong> to explore communities around here.
              </Typography>
              <Typography component="p" gutterBottom={true}>
                Use <strong>Recents</strong> to see your recent conversations.
              </Typography>
            </Paper>
          </main>
        </div>
      </div>
    );
  }
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
