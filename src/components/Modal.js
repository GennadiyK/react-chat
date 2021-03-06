import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Modal extends React.Component {
  render() {
    const {
      isOpen, title, handleClose, handleConfirm, children,
    } = this.props;
    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              no
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
