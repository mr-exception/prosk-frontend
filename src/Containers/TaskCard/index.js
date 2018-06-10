import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Input from '@material-ui/core/Input';

import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';

import TrackTable from './TrackTable';
import NewTrack from './NewTrack';


const styles = theme => ({
  root: {
    marginBottom: 20,
  },
  card: {
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: theme.spacing.unit,
    width: '50%',
    maxWidth: 600
  },
  timer: {
    margin: 'auto'
  }
});
class index extends React.Component {
  state = { 
    timer: {
      active: false,
      value: 0,
    },
    expanded: false,
    newTrackDialogOpen: false,
  };

  openNewTrackDialog = () => {
    this.setState({
      newTrackDialogOpen: true
    })
  }
  closeNewTrackDialog = () => {
    this.setState({
      newTrackDialogOpen: false
    })
  }
  componentDidMount(){
    setInterval(() => {
      if(!this.state.timer.active)
        return;
      const currentState = this.state;
      currentState.timer.value++;
      this.setState(currentState);
      console.log(currentState.timer);
    }, 1000);
  }

  handleTimer = () => {
    if(this.state.timer.active){
      const seconds = this.state.timer.value % 60;
      const minutes = Math.floor(this.state.timer.value/60);
      const hours = Math.floor(this.state.timer.value/3600);
      return `${hours}:${minutes}:${seconds}`;
    }else
      return '';
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  startTracking = () => {
    this.setState({timer: {active: true, value: 0}});
  }

  stopTracking = () => {
    this.setState({timer: {active: false, value: 0}});
  }

  render() {
    const { classes, status } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card} style={status===3? {background: '#EEE'}: {}}>
          <CardHeader
            action={[
              status === 3?(
                <Tooltip key="done" id="tooltip-icon" title="mark as doing">
                  <IconButton className={classes.button} style={{color: orange[500]}} aria-label="Done">
                    <i className="material-icons">error</i>
                  </IconButton>
                </Tooltip>
              ):(
                <Tooltip key="done" id="tooltip-icon" title="mark as done">
                  <IconButton className={classes.button} style={{color: green[600]}} aria-label="Done">
                    <i className="material-icons">check_circle</i>
                  </IconButton>
                </Tooltip>
              )
              ,
              <Tooltip key="timer" id="tooltip-icon" title="add custom track">
                <IconButton className={classes.button} style={{color: blue[600]}} onClick={this.openNewTrackDialog} aria-label="Delete">
                  <i className="material-icons">av_timer</i>
                </IconButton>
              </Tooltip>,
              <Tooltip key="delete" id="tooltip-icon" title="remove task">
                <IconButton className={classes.button} style={{color: red[800]}} aria-label="Delete">
                  <i className="material-icons">delete</i>
                </IconButton>
              </Tooltip>
            ]}
            title={this.props.title}
            subheader="you worked on this task for 02:05:43"
          />
          <CardContent>
            <Typography component="p">{this.props.description}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {status !== 3?(
              [<Tooltip key="stop" id="tooltip-icon" title="stop and save tracking">
                <IconButton aria-label="Stop" style={{color: red[600]}} onClick={this.stopTracking}>
                  <i className="material-icons">stop</i>
                </IconButton>
              </Tooltip>,
              <Tooltip key="play" id="tooltip-icon" title="start tracking">
                <IconButton aria-label="Start" style={{color: blue[600]}} onClick={this.startTracking}>
                  <i className="material-icons">play_arrow</i>
                </IconButton>
              </Tooltip>,
              <Input
                key="description"
                placeholder="enter something about you works today"
                className={classes.input}
                inputProps={{
                  'aria-label': 'track-description',
                }}
              />,
              <Typography key="timer" variant="subheading" className={classes.timer} gutterBottom>
                {this.handleTimer()}
              </Typography>]
            ): ''}
            <Tooltip id="tooltip-icon" title={this.state.expanded? "hide": "show more"}>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show"
              >
                <i className="material-icons">expand_more</i>
              </IconButton>
            </Tooltip>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <TrackTable />
            </CardContent>
          </Collapse>
        </Card>
        <NewTrack open={this.state.newTrackDialogOpen} close={this.closeNewTrackDialog}/>
      </div>
    );
  }
}

index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(index);