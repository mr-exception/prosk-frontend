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

import {newTask} from '../Drivers/Tasks';

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

    onSave = () => {
        // newTask(this.title.value, this.description.value, this.start_time.value, this.finish_time.value, 5, (task) => {
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const start_time = document.getElementById('start_time').value
        const finish_time = document.getElementById('finish_time').value

        newTask(title, description, start_time, finish_time, 5, (task) => {
            this.props.close()
        }, (errors) => {

        })
    }
  componentDidMount(){
    const start_date = new Date();
    const finish_date = new Date(Date.now() + 48*60*60*1000);
    this.setState({
        default_dates: {
            start: DateFromat(start_date, 'yyyy-mm-dd') + 'T' + DateFromat(start_date, 'hh:MM'),
            finish: DateFromat(finish_date, 'yyyy-mm-dd') + 'T' + DateFromat(finish_date, 'hh:MM')
        }     
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
                ref={(ref) => this.title = ref}
                autoFocus
                margin="dense"
                id="title"
                label="task title"
                type="text"
                fullWidth
                className={classes.textField}
            />
            <TextField
                ref={(ref) => this.description = ref}
                id="description"
                label="Multiline"
                multiline
                rowsMax="4"
                className={classes.textField}
                margin="normal"
                fullWidth
            />
            <TextField
                ref={(ref) => this.start_time = ref}
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
                ref={(ref) => this.finish_time = ref}
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
            <Button onClick={this.onSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withStyles(styles)(NewTask);