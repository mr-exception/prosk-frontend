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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    textField: {
        marginRight: theme.spacing.unit,
    },
    datePicker: {
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit*4,
    },
});
class Filter extends React.Component {
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
    },

    filters: {
        poritory: -1,
        status: -1,
        title: -1,
        
        descrition: -1,
        started_min: -1,
        started_max: -1,
        start_min: -1,
        start_max: -1,

        finished_min: -1,
        finished_max: -1,
        finish_min: -1,
        finish_max: -1,
        
        poritory_max: -1,
        poritory_min: -1,
    },
  };

    onSave = () => {
        const current_filters = this.state.filters;
        const keys = Object.keys(current_filters);
        for(let i=0; i<keys.length; i++)
            if(current_filters[keys[i]] === -1)
                delete current_filters[keys[i]];
        
        const dates = ['start_min', 'start_max', 'finish_min', 'finish_max', 'started_min', 'started_max', 'finished_min', 'finished_max'];
        for(let i=0; i<dates.length; i++){
            if(!(dates[i] in current_filters))
                continue;
            const date_string = DateFromat(new Date(current_filters[dates[i]]), 'yyyy-mm-dd hh:MM:ss');
            current_filters[dates[i]] = date_string;
        }
        
        this.props.close(true, current_filters);
    }

    handleChange = (event, key) => {
        const filters = this.state.filters
        filters[key] = event.target.value
        this.setState({filters})
    }
    clear = () => {
        this.setState({
            filters: {
                poritory: -1,
                status: -1,
                title: -1,
                
                descrition: -1,
                started_min: -1,
                started_max: -1,
                start_min: -1,
                start_max: -1,
        
                finished_min: -1,
                finished_max: -1,
                finish_min: -1,
                finish_max: -1,
                
                poritory_max: -1,
                poritory_min: -1,
            },
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
                aria-labelledby="new-filter"
            >
            <DialogTitle id="new-filter">Set Filter</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    you can set some filters here
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="task title"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    value={this.state.filters.title !== -1? this.state.filters.title: ''}
                    onChange={(e) => {this.handleChange(e,'title')}}

                    error={this.state.errors.title}
                    helperText={this.state.errors.title_message}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="task description"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    value={this.state.filters.description !== -1? this.state.filters.description: ''}
                    onChange={(e) => {this.handleChange(e,'description')}}

                    error={this.state.errors.description}
                    helperText={this.state.errors.description_message}
                />
                <div>
                    <TextField
                        id="started_min"
                        label="have to be started after"
                        type="datetime-local"
                        className={classes.datePicker}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.filters.started_min !== -1? this.state.filters.started_min: ''}
                        onChange={(e) => {this.handleChange(e,'started_min')}}

                        error={this.state.errors.started_min}
                        helperText={this.state.errors.started_min? this.state.errors.started_min_message: ''}
                    />
                    <TextField
                        id="started_max"
                        label="have to be started before"
                        type="datetime-local"
                        className={classes.datePicker}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.filters.started_max !== -1? this.state.filters.started_max: ''}
                        onChange={(e) => {this.handleChange(e,'started_max')}}

                        error={this.state.errors.started_max}
                        helperText={this.state.errors.started_max? this.state.errors.started_max_message: ''}
                    />
                </div>
                <div>
                    <TextField
                        id="finished_min"
                        label="have to be finished after"
                        type="datetime-local"
                        className={classes.datePicker}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.filters.finish_min !== -1? this.state.filters.finish_min: ''}
                        onChange={(e) => {this.handleChange(e,'finished_min')}}

                        error={this.state.errors.finished_min}
                        helperText={this.state.errors.finished_min? this.state.errors.finished_min_message: ''}
                    />
                    <TextField
                        id="finished_max"
                        label="have to be finished before"
                        type="datetime-local"
                        className={classes.datePicker}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.filters.finish_max !== -1? this.state.filters.description: ''}
                        onChange={(e) => {this.handleChange(e,'finished_max')}}

                        error={this.state.errors.finished_max}
                        helperText={this.state.errors.finished_max? this.state.errors.finished_max_message: ''}
                    />
                </div>
                <div>
                    <TextField
                        id="start_min"
                        label="wanted to be start after"
                        type="datetime-local"
                        className={classes.datePicker}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.filters.start_min !== -1? this.state.filters.start_min: ''}
                        onChange={(e) => {this.handleChange(e,'start_min')}}
                        
                        error={this.state.errors.start_min}
                        helperText={this.state.errors.start_min? this.state.errors.start_min_message: ''}
                    />
                    <TextField
                        id="start_max"
                        label="wanted to be start before"
                        type="datetime-local"
                        className={classes.datePicker}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.filters.start_max !== -1? this.state.filters.start_max: ''}
                        onChange={(e) => {this.handleChange(e,'start_max')}}

                        error={this.state.errors.start_max}
                        helperText={this.state.errors.start_max? this.state.errors.start_max_message: ''}
                    />
                </div>
                <div>
                    <TextField
                        id="finish_min"
                        label="wanted to be finish after"
                        type="datetime-local"
                        className={classes.datePicker}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.filters.finish_min !== -1? this.state.filters.finish_min: ''}
                        onChange={(e) => {this.handleChange(e,'finish_min')}}

                        error={this.state.errors.finish_min}
                        helperText={this.state.errors.finish_min? this.state.errors.finish_min_message: ''}
                    />
                    <TextField
                        id="finish_max"
                        label="wanted to be finish before"
                        type="datetime-local"
                        className={classes.datePicker}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.filters.finish_max !== -1? this.state.filters.finish_max: ''}
                        onChange={(e) => {this.handleChange(e,'finish_max')}}

                        error={this.state.errors.finish_max}
                        helperText={this.state.errors.finish_max? this.state.errors.finish_max_message: ''}
                    />
                </div>
                <div style={{marginTop: 20}}>
                    <InputLabel htmlFor="poritory">poritory</InputLabel>
                    <Select style={{marginLeft: 20, marginRight: 40}}
                        value={this.state.filters.poritory}
                        onChange={(e) => {this.handleChange(e, 'poritory')}}
                        inputProps={{
                            name: 'poritory',
                            id: 'poritory',
                        }}
                    >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value={-1}>all</MenuItem>
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                    </Select>
                    <InputLabel htmlFor="status">status</InputLabel>
                    <Select style={{marginLeft: 20}}
                        value={this.state.filters.status}
                        onChange={(e) => {this.handleChange(e, 'status')}}
                        inputProps={{
                            name: 'status',
                            id: 'status',
                        }}
                    >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value={-1}>all</MenuItem>
                        <MenuItem value={1}>Doing</MenuItem>
                        <MenuItem value={3}>Done</MenuItem>
                    </Select>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.clear} color="primary">
                clear all
                </Button>
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

export default withStyles(styles)(Filter);