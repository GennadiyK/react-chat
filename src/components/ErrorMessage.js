import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class ErrorMessage extends React.Component {
  state = {
    open: false,
  };

  handleCloseSnackBar = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.error) {
      this.setState({ open: true})
    }
  };

  render() {
    const { error } = this.props;

    if(!error) {
      return null;
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={<span>{error.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackBar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default ErrorMessage;