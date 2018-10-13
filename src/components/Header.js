import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import MainMenu from "./MainMenu";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import titleInitials from '../utils/title-initial'

const styles = theme => ({
  appBar: {
    width: `calc(100% - 320px)`,
  },
  toolBar: {
    color: 'rgb(255, 255, 255)',
  },
  toolBarTitle: {
    flexGrow:1,
    marginLeft: '16px',
    marginRight: '16px',
  },
  toolBarAvatar: {
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
  },
});


class Header extends React.Component {
  state = {
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
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
       <AppBar
            position="absolute"
            className={classes.appBar}
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
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);