import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SimpleBottomNavigation from './components/BottomNavigation'
import Paper from '@material-ui/core/Paper';
import SelectList from "./components/SelectList";
import SearchField from "./components/SearchField";
import MainMenu from "./components/MainMenu";

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
  chatList: {
    flexGrow:1,
    overflow: 'auto',
  },
  'appBar-left': {
    marginLeft: '320px',
  },
  'appBar-right': {
    marginRight: '320px',
  },
  drawerPaper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    width: '320px',
  },
  toolBar: {
    color: 'rgb(255, 255, 255)',
  },
  toolBarTitle: {
    flexGrow:1,
    marginLeft: '16px',
    marginRight: '16px',
  },
  asideToolbar: {
    borderBottom: '1px solid  rgba(0, 0, 0, 0.12)',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
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
            <Toolbar className={classes.toolBar}>
              <Typography  className={classes.toolBarTitle} variant="title" color="inherit" noWrap>
                React chat
              </Typography>
              <MainMenu/>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor={anchor}
          >
            <Toolbar className={classes.asideToolbar}>
              <SearchField/>
            </Toolbar>
            <SelectList/>
            <SimpleBottomNavigation/>
          </Drawer>
          <main className={classes.content}>
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
