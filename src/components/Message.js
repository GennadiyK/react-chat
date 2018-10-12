import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import titleInitials from '../utils/title-initial';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    chatMessage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '8px 24px',
    },
    chatMessageMe: {
        flexDirection: 'row-reverse',
    },
    chatMessageInner: {
        marginLeft: '16px',
        marginRight: '16px',
        padding: '6px',
        maxWidth: '70%',
        minWidth: '10%',
    },
});


class Message extends React.Component {
    render() {
       const {classes, sender, content} = this.props;

       return (
            <div className={sender === 'me' ? classNames(classes.chatMessage, classes.chatMessageMe) : classes.chatMessage}>
                <Avatar>{titleInitials(sender)}</Avatar>
                <Paper className={classes.chatMessageInner} elevation={3}>
                    <Typography  component="span">
                        {sender}
                    </Typography>
                    <Typography  variant={'body2'} component="p">
                        {content}
                    </Typography>
                    <Typography variant={'caption'} component="span">
                        a few seconds ago
                    </Typography>
                </Paper>
            </div>
       )
    }
}

Message.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);