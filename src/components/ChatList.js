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
import {Link} from 'react-router-dom';


const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'auto',
    height: '100%',
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
  constructor (props) {
    super();
    this.state = {
      selectedIndex: props.chats.active ? props.chats.active._id : null
    };
  }


  handleListItemClick = (event, chatId) => {
    this.setState({
      selectedIndex: chatId
    });
    this.props.setActiveChat(chatId)
  };

  render() {
    const { classes, chats, showCreateChatModal} = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {chats.all && chats.all.map((chat, index) =>
            <ListItem
              button
              component={Link}
              selected={Boolean(this.state.selectedIndex === chat._id)}
              to={`/chat/${chat._id}`}
              disableGutters={true}
              onClick={(event) => this.handleListItemClick(event, chat._id)}
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
