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

import TrackTable from './TrackTable';

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
});
class index extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            action={[
              <Tooltip id="tooltip-icon" title="mark as done">
                <IconButton className={classes.button} style={{color: green[600]}} aria-label="Done">
                  <i className="material-icons">check_circle</i>
                </IconButton>
              </Tooltip>,
              <Tooltip id="tooltip-icon" title="add custom track">
                <IconButton className={classes.button} style={{color: blue[600]}} aria-label="Delete">
                  <i className="material-icons">av_timer</i>
                </IconButton>
              </Tooltip>,
              <Tooltip id="tooltip-icon" title="remove task">
                <IconButton className={classes.button} style={{color: red[800]}} aria-label="Delete">
                  <i className="material-icons">delete</i>
                </IconButton>
              </Tooltip>
            ]}
            title="Task Title"
            subheader="you worked on this task for 02:05:43"
          />
          <CardContent>
            <Typography component="p">
                Culpa id dolore ullamco minim ea sit aliqua laboris cillum mollit excepteur id. Pariatur voluptate commodo tempor aliquip cupidatat duis ipsum laboris dolor consectetur magna id eu. Cupidatat labore labore do adipisicing anim est dolore sit consequat labore velit aliqua amet in. Magna laboris anim irure quis id et nisi duis elit dolore deserunt ipsum.
                Esse est qui occaecat eu aliquip adipisicing eiusmod mollit duis. Eu fugiat fugiat esse dolore irure reprehenderit proident consequat amet qui aliqua officia incididunt cupidatat. Culpa qui do anim officia labore. Nisi amet nostrud aute pariatur. Esse qui nisi ullamco excepteur qui dolore labore voluptate nostrud ullamco laboris amet Lorem. Reprehenderit voluptate eu ut consectetur deserunt incididunt dolore enim eu.
                Irure in duis exercitation mollit adipisicing cillum nisi ipsum. Veniam laboris adipisicing ex id qui aliquip tempor qui in proident cupidatat. Et nisi sint esse Lorem.
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Tooltip id="tooltip-icon" title="stop and save tracking">
              <IconButton aria-label="Stop" style={{color: red[600]}}>
                <i className="material-icons">stop</i>
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="start tracking">
              <IconButton aria-label="Start" style={{color: blue[600]}}>
                <i className="material-icons">play_arrow</i>
              </IconButton>
            </Tooltip>
            <Input
              placeholder="enter something about you works today"
              className={classes.input}
              inputProps={{
                'aria-label': 'track-description',
              }}
            />
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
      </div>
    );
  }
}

index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(index);