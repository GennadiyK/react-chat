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
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import titleInitials from './utils/title-initial'
import { chats, messages } from './mock-data'


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
  chatMessageWrap: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    paddingTop: '24px',
    paddingBottom: '179px'
  },
  chatMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '8px 24px',
  },
  chatMessageMe: {
    flexDirection: 'row-reverse',
  },
  chatListPaper: {
    marginLeft: '16px',
    marginRight: '16px',
    padding: '6px',
    maxWidth: '70%',
    minWidth: '10%',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '64px',
    height: '100%',
  },
  paper: {
    padding: '24px',
    display: 'none',
  },
  textFieldWrap: {
    left: '320px',
    right: 0,
    bottom: 0,
    padding: '24px',
    position: 'fixed',
  },
  textFieldPaper: {
    padding: '16px'
  },
  toolBarAvatar: {
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
  }
});

class PermanentDrawer extends React.Component {
  state = {
    anchor: 'left',
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
          >
            <Toolbar className={classes.toolBar}>
              <Avatar className={classes.toolBarAvatar}>{titleInitials('Jon Lenon Jon Lenon')}</Avatar>
              <Typography  className={classes.toolBarTitle} variant="title" color="inherit" noWrap>
                Name
                <IconButton
                  aria-label="More"
                  aria-owns={open ? 'long-menu' : null}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                    },
                  }}
                >
                  <MenuItem  onClick={this.handleClose}>
                    Delete
                  </MenuItem>
                </Menu>
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
            <div className={classes.chatMessageWrap}>
              <div className={classNames(classes.chatMessage, classes.chatMessageMe)}>
                <Avatar>G</Avatar>
                <Paper className={classes.chatListPaper} elevation={3}>
                  <Typography  component="span">
                    Gennadiy
                  </Typography>
                  <Typography  variant={'body2'} component="p">
                    How are you?
                  </Typography>
                  <Typography variant={'caption'} component="span">
                    a few seconds ago
                  </Typography>
                </Paper>
              </div>
              <div className={classNames(classes.chatMessage)}>
                <Avatar>G</Avatar>
                <Paper className={classes.chatListPaper} elevation={3}>
                  <Typography  component="span">
                    Gennadiy
                  </Typography>
                  <Typography  variant={'body2'} component="p">
                    How are you?
                  </Typography>
                  <Typography variant={'caption'} component="span">
                    a few seconds ago
                  </Typography>
                </Paper>
              </div>
              <div className={classNames(classes.chatMessage)}>
                <Avatar>G</Avatar>
                <Paper className={classes.chatListPaper} elevation={3}>
                  <Typography  component="span">
                    Gennadiy
                  </Typography>
                  <Typography  variant={'body2'} component="p">
                    How are you?
                  </Typography>
                  <Typography variant={'caption'} component="span">
                    a few seconds ago
                  </Typography>
                </Paper>
              </div>
            </div>
            <div className={classes.textFieldWrap}>
              <Paper  elevation={3} className={classes.textFieldPaper}>
                <TextField
                  placeholder="Type your message..."
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Paper>
            </div>
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
