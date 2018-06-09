import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        marginRight: theme.spacing.unit,
    },
    datePicker: {
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit*4,
    },
});
class NewTask extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {classes} = this.props;
    return (
        <Dialog
            fullWidth={true}
            maxWidth='md'
            open={this.props.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
                you can have new task here
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="task title"
                type="text"
                fullWidth
                className={classes.textField}
            />
            <TextField
                id="multiline-flexible"
                label="Multiline"
                multiline
                rowsMax="4"
                className={classes.textField}
                margin="normal"
                fullWidth
            />
            <TextField
                id="start_time"
                label="have to be started at"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.datePicker}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="finish_time"
                label="have to be finished at"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.datePicker}
                InputLabelProps={{
                    shrink: true,
                }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.props.close} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withStyles(styles)(NewTask);