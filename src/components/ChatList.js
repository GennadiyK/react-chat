import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from "@material-ui/core/es/colors/deepPurple";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'auto',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  addButton: {
    position: 'absolute',
    bottom: '74px',
    right: '24px',
  },
  listItem: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  listItemAvatar: {
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 0,
  }
});

class ChatList extends React.Component {
  state = {
    selectedIndex: 1,
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, chats } = this.props;

    const chatItems = chats.map((chat, index) =>
      <ListItem
        button
        selected={this.state.selectedIndex === index}
        onClick={event => this.handleListItemClick(event, index)}
        disableGutters={true}
        className={classes.listItem}
        key={index}
      >

        <Avatar className={classNames(classes.purpleAvatar, classes.listItemAvatar)}>OP</Avatar>
        <ListItemText primary={chat.title} secondary={chat.date}/>
      </ListItem>
    );

    return (
      <div className={classes.root}>
        <List component="nav">
          {chatItems}
        </List>
        <Button variant="fab" color="primary" aria-label="Add" className={classes.addButton}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

ChatList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatList);
