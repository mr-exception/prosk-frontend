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
    },
    errors: {
        title: false,
        title_message: '',
        description: false,
        description_message: '',
        start_time: false,
        finish_time: false,
        start_time_message: '',
        finish_time_message: '',
    }
  };

    onSave = () => {
        const title = document.getElementById('title').value
        const description = this.state.description
        const poritory = document.getElementById('poritory').value
        const start_date = new Date(document.getElementById('start_time').value);
        const finish_date = new Date(document.getElementById('finish_time').value);
        
        const current_state = this.state;
        if(start_date > finish_date){    
            current_state.errors.start_time = true;
            current_state.errors.finish_time = true;
            current_state.errors.start_time_message = 'starting time must be before finish time'
            current_state.errors.finish_time_message = 'starting time must be before finish time'
        }else{
            current_state.errors.start_time = false;
            current_state.errors.finish_time = false;
        }
        if(title == null || title == ''){
            current_state.errors.title = true;
            current_state.errors.title_message = 'please enter title';
        }else{
            if((title||'').length > 32){
                current_state.errors.title = true;
                current_state.errors.title_message = 'title must be less than 32 charachters';
            }else 
                current_state.errors.title = false;
        }

        if(description == null || description == ''){
            current_state.errors.description = true;
            current_state.errors.description_message = 'please enter description';
        }else{
            if((description||'').length > 256){
                current_state.errors.description = true;
                current_state.errors.description_message = 'description must be less than 256 charachters';
            }else
                current_state.errors.description = false;
        }
        this.setState(current_state)
        if(current_state.errors.title || current_state.errors.description || current_state.errors.finish_time || current_state.errors.start_time){
            return;
        }
        const start_time = DateFromat(start_date, 'yyyy-mm-dd hh:MM:ss');
        const finish_time = DateFromat(finish_date, 'yyyy-mm-dd hh:MM:ss');
        
        newTask(title, description, start_time, finish_time, poritory, (task) => {
            this.props.close(true, 'new task added successfully')
        }, (errors) => {
            console.log(errors)
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
            aria-labelledby="new-task"
        >
          <DialogTitle id="new-task">New Task</DialogTitle>
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

                error={this.state.errors.title}
                helperText={this.state.errors.title_message}
            />
            <TextField
                id="description"
                label="description"
                multiline
                rowsMax="4"
                className={classes.textField}
                margin="normal"
                fullWidth
                onChange={(e) => {this.setState({description: e.target.value})}}

                error={this.state.errors.description}
                helperText={this.state.errors.description_message}
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
                error={this.state.errors.start_time}
                helperText={this.state.errors.start_time? this.state.errors.start_time_message: ''}
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
                error={this.state.errors.finish_time}
                helperText={this.state.errors.finish_time? this.state.errors.finish_time_message: ''}
            />
            <TextField
                id="poritory"
                label="Poritory"
                type="number"
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
                defaultValue={5}
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                margin="normal"
                style={{width: 100}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.props.close(false)}} color="secondary">
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