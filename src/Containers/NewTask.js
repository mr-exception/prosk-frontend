import React from 'react';
import DateFromat from 'dateformat';
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
    default_dates: {
        start: '',
        finish: '',
    }
  };

  componentDidMount(){
    const start_date = new Date();
    const finish_date = new Date(Date.now() + 48*60*60*1000);
    this.setState({
        default_dates: {
            start: DateFromat(start_date, 'yyyy-mm-dd') + 'T' + DateFromat(start_date, 'hh:MM'),
            finish: DateFromat(finish_date, 'yyyy-mm-dd') + 'T' + DateFromat(finish_date, 'hh:MM')
        }     
    }, () => {
        console.log(this.state.default_dates)
    })
  }
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
                id="description"
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
                defaultValue={this.state.default_dates.start}
                className={classes.datePicker}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="finish_time"
                label="have to be finished at"
                type="datetime-local"
                defaultValue={this.state.default_dates.finish}
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