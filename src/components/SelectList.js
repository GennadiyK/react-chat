import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from "@material-ui/core/es/colors/deepPurple";

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'after',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

class SelectedListItem extends React.Component {
  state = {
    selectedIndex: 1,
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}
          >
            <Avatar className={classes.purpleAvatar}>OP</Avatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem>
          <ListItem
            button
            selected={this.state.selectedIndex === 1}
            onClick={event => this.handleListItemClick(event, 1)}
          >
            <Avatar className={classes.purpleAvatar}>OP</Avatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem>
        </List>
      </div>
    );
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedListItem);