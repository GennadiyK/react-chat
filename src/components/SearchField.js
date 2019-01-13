import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


class SearchField extends React.Component {
  handleSearch = (e) => {
    const { searchChat } = this.props;
    searchChat(e.target.value);
  };

  render() {
    const {
      classes,
    } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          placeholder="Search chats..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleSearch}
        />
      </form>
    );
  }
}

export default withStyles(styles)(SearchField);
