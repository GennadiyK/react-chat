import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from './Avatar';
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
    color: '#fff',
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 0,
    marginRight: 10,
  }
});

class ChatList extends React.Component {
  state = {
    selectedIndex: this.props.activeChat._id,
  };

  handleListItemClick = (event, chatId) => {
    this.props.setActiveChat(chatId);
    this.setState({ selectedIndex: chatId });
  };

  render() {
    const { classes, chats, showCreateChatModal} = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {chats && chats.map((chat, index) =>

            <ListItem
              button
              selected={this.state.selectedIndex === chat._id}
              onClick={event => this.handleListItemClick(event, chat._id)}
              disableGutters={true}
              className={classes.listItem}
              key={index}
            >

              <Avatar className={classNames(classes.listItemAvatar)} colorFrom={chat.title}>{chat.title}</Avatar>
              <ListItemText primary={chat.title} secondary={chat.date}/>
            </ListItem>
          )}
        </List>
        <Button variant="fab" color="primary" aria-label="Add" className={classes.addButton} onClick={showCreateChatModal}>
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
