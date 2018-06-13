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

import {newTrack} from '../../Drivers/Tracks';


const styles = theme => ({
    textField: {
        marginRight: theme.spacing.unit,
    },
    datePicker: {
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit*4,
    },
});
class NewTrack extends React.Component {
    state = {
        default_dates: {
            start: '',
            finish: '',
        },
        errors: {
            description: false,
            start_time: false,
            finish_time: false,
            start_time_message: '',
            finish_time_message: '',
        },
        description: ''
    };

    componentDidMount(){
        const start_date = new Date();
        const finish_date = new Date(Date.now() + 2*60*60*1000);
        this.setState({
            default_dates: {
                start: DateFromat(start_date, 'yyyy-mm-dd') + 'T' + DateFromat(start_date, 'hh:MM'),
                finish: DateFromat(finish_date, 'yyyy-mm-dd') + 'T' + DateFromat(finish_date, 'hh:MM')
            }     
        })
    }
    onSave = () => {
        this.setState({
            errors: {
                description: false,
                description_message: '',
                start_time: false,
                finish_time: false,
                start_time_message: '',
                finish_time_message: '',
        }}, () => {
            const description = this.state.description

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
            if(description === null || description === ''){
                current_state.errors.description = true;
                current_state.errors.description_message = 'please enter description';
            }else{
                if((description||'').length > 64){
                    current_state.errors.description = true;
                    current_state.errors.description_message = 'description must be less than 64 charachters';
                }else
                    current_state.errors.description = false;
            }
            this.setState(current_state)
            if(current_state.errors.description || current_state.errors.finish_time || current_state.errors.start_time){
                console.log('error')
                return;
            }
            const start_time = DateFromat(start_date, 'yyyy-mm-dd HH:MM:ss');
            const finish_time = DateFromat(finish_date, 'yyyy-mm-dd HH:MM:ss');

            newTrack(this.props.task_id,description, start_time, finish_time, (track) => {
                this.props.close(null, true)
            }, (errors) => {
                for(let i=0; i<errors.length; i++){
                    if(errors[i].code === 1002){
                        const current_state = this.state;
                        current_state.errors.start_time = true;
                        current_state.errors.finish_time = true;
                        current_state.errors.start_time_message = 'there is time collision between tracks';
                        current_state.errors.finish_time_message = 'there is time collision between tracks';
                        this.setState(current_state);
                    }
                }
            })
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
            <DialogTitle id="form-dialog-title">New Track</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    you can add new track here:
                </DialogContentText>
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

export default withStyles(styles)(NewTrack);