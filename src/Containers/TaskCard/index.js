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
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DateFromat from 'dateformat';

import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';

import {removeTask, finishTask, doingTask} from '../../Drivers/Tasks';
import {getTracks, startTrack, stopTrack} from '../../Drivers/Tracks';

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
  },

  paper: {
    textAlign: 'center',
    padding: 25,
    marginTop: 40,
    width: '50%',
    marginLeft: '23%',
  },
  typography: {
    margin: 20
  }
});
class index extends React.Component {
  state = { 
    timer: {
      active: false,
      value: 0,
      track_id: 0,
    },
    expanded: false,
    newTrackDialogOpen: false,
    loadingTracks: false,
    tracks: [],
    errors: {
      description: false,
    }
  };

  openNewTrackDialog = () => {
    this.setState({
      newTrackDialogOpen: true
    })
  }
  closeNewTrackDialog = (e, reload=false) => {
    this.setState({
      newTrackDialogOpen: false
    })
    if(reload){
      this.props.openSnackbar(`new track added, you can see the track by expanding the task ${this.props.title}`);
      this.loadTracks();
    }
  }
  componentDidMount(){
    setInterval(() => {
      if(!this.state.timer.active)
        return;
      const currentState = this.state;
      currentState.timer.value++;
      this.setState(currentState);
    }, 1000);
    this.loadTracks()
  }
  loadTracks = () => {
    this.setState({loadingTracks: true}, () => {
      getTracks(this.props.id, (tracks) => {
        let sum = 0;
        for(let i=0; i<tracks.length; i++){
          if(tracks[i].started_at == null || tracks[i].finished_at == null)
            continue;
          const start_ts = (new Date(tracks[i].started_at)).getTime();
          const finish_ts = (new Date(tracks[i].finished_at)).getTime();
          sum += finish_ts - start_ts;
        }
        sum /= 1000;
        const hours = Math.floor(sum /3600);
        const minutes = Math.floor(sum /60);
        const seconds = Math.floor(sum %60);
        const sum_of_tracks = {hours, minutes, seconds};
        this.setState({tracks, loadingTracks: false, sum_of_tracks}, () => {
        });
      }, () => {
        console.log('failed');
      })
    })
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

  workd_time_string = () => {
    const sum = this.state.sum_of_tracks;
    if(!sum)
      return 'loading...';
    if(sum.hours > 0)
      return `you've worked ${sum.hours} hours and ${sum.minutes} seconds on this task`;
    else if(sum.hours >0 || sum.minutes >0 || sum.seconds >0)
      return `you've worked ${sum.minutes} minutes and ${sum.seconds} seconds on this task`;
    else
      return `you havn't worked on this task yet`;
  }
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  startTracking = () => {
    const start_time = DateFromat(new Date(), 'yyyy-mm-dd hh:MM:ss');
    const description = document.getElementById('description').value;

    if(description == null || description == ''){
      this.setState({errors: {description: true}})
      return;
    }else
      this.setState({errors: {description: false}})

    startTrack(this.props.id, description, start_time, (track) => {
      this.setState({timer: {active: true, value: 0, track_id: track.id}});
    }, (errors) => {
      console.log('error')
    })
  }

  stopTracking = () => {
    var finish_time = DateFromat(new Date(), 'yyyy-mm-dd hh:MM:ss');
    const description = document.getElementById('description').value;

    if(description == null || description == '')
      this.setState({errors: {description: true}})
    else
      this.setState({errors: {description: false}})
    stopTrack(this.state.timer.track_id, description, finish_time, (track) => {
      this.setState({timer: {active: false, value: 0, track_id: 0}});
      this.loadTracks();
    }, (errors) => {
      console.log('error')
    })
  }

  onDelete = () => {
    removeTask(this.props.id, () => {
      this.props.loadPage();
    }, (errors) => {
      console.log(errors)
    })
  }

  onFinish = () => {
    finishTask(this.props.id, () => {
      this.props.loadPage()
    }, (errors) => {
      console.log(errors)
    })
  }
  
  onDoing = () => {
    console.log('tet')
    doingTask(this.props.id, () => {
      this.props.loadPage()
    }, (errors) => {
      console.log(errors)
    })
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
                  <IconButton className={classes.button} onClick={this.onDoing} style={{color: orange[500]}} aria-label="Done">
                    <i className="material-icons">error</i>
                  </IconButton>
                </Tooltip>
              ):(
                <Tooltip key="done" id="tooltip-icon" title="mark as done">
                  <IconButton className={classes.button} style={{color: green[600]}} onClick={this.onFinish} aria-label="Done">
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
                <IconButton className={classes.button} style={{color: red[800]}} onClick={this.onDelete} aria-label="Delete">
                  <i className="material-icons">delete</i>
                </IconButton>
              </Tooltip>
            ]}
            title={`${this.props.title}`}
            subheader={this.workd_time_string()}
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
                id="description"
                className={classes.input}
                inputProps={{
                  'aria-label': 'track-description',
                }}
                error={this.state.errors.description}
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
              {this.state.loadingTracks?
                'loading':
                (this.state.tracks.length > 0?
                  <TrackTable tracks={this.state.tracks} loadTracks={this.loadTracks}/>:
                  <div className={classes.paper}>
                    <Typography className={classes.typography} variant="body2" gutterBottom>
                      you dont have any track. add one of them or start a new track
                    </Typography>
                    {this.props.status != 3?

                      <Typography component="p">
                        <Button variant="contained" color="primary" onClick={this.openNewTrackDialog} className={classes.typography} className={classes.button}>
                          add new track
                        </Button>
                      </Typography>
                    :''}
                  </div>
                )}
            </CardContent>
          </Collapse>
        </Card>
        <NewTrack task_id={this.props.id} open={this.state.newTrackDialogOpen} close={this.closeNewTrackDialog}/>
      </div>
    );
  }
}

index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(index);