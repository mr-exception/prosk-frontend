import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MainLayout from './Layouts/Main';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import TaskCard from './TaskCard/index';
import NewTask from './NewTask';

import TokenDriver from '../Drivers/Token';
import TaskDriver from '../Drivers/Tasks';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 20,
    marginRight: 20,
    marginTop: theme.spacing.unit * 3,
    position: 'relative',
  }),
  floatingButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  paper: {
    textAlign: 'center',
    padding: 25,
    marginTop: 40,
    width: '50%',
    marginLeft: '23%',
  },
  typography: {
    margin: 25
  }
});

class Dashboard extends React.Component {
  /**
   * page title is the string that comes in document.title in format => [Project Title] - [Page Title]
   */
  pageTitle = 'Dashboard'
  /**
   * content is the main render function for the content yield in layout
   */
  state = {
    newTaskDialogOpen: false,
    tasks: [],
    loading: false,

    snackbar: {
      open: false,
      message: '',
    }
  };

  componentDidMount(){
    this.loadPage();
  }

  loadPage = () => {
    this.setState({
      loading: true
    }, () => {
      TaskDriver.getTasks((tasks) => {
        this.setState({
          tasks, loading: false
        })
      }, (errors) => {
        console.log(errors);
      });
    })
  }
  openNewTaskDialog = () => {
    this.setState({
      newTaskDialogOpen: true
    })
  }
  closeNewTaskDialog = (reload=false, message='') => {
    if(reload){
      this.loadPage();
      this.handleOpenSnackbar(message)
    }
    this.setState({
      newTaskDialogOpen: false
    })
  }
  handleCloseSnackbar = () => {
    this.setState({
      snackbar: {
        open: false,
        message: '',
      }
    })
  }
  handleOpenSnackbar = (message) => {
    if(message != '')
      this.setState({
        snackbar: {
          open: true,
          message
        }
      })
  }
  content = () => {
    const { classes } = this.props;
    return (
      <div>
        <Grid container justify='center' style={{marginTop: 15}}>
          <Grid item lg={10} md={10} sm={12} xs={12}>
            {this.state.loading?
                <Paper className={classes.paper} elevation={4}>
                  <Typography className={classes.typography} variant="headline" component="title">
                    Loading...
                  </Typography>
                  <CircularProgress className={classes.progress} thickness={7} />
                </Paper>:
                (this.state.tasks.length > 0?
                  this.state.tasks.map((item, index) => <TaskCard key={index} {...item} loadPage={this.loadPage} openSnackbar={this.handleOpenSnackbar}/>):
                  <Paper className={classes.paper} elevation={4}>
                    <Typography className={classes.typography} variant="headline" component="title">
                      you dont have any task.
                    </Typography>
                    <Typography component="p">
                      <Button variant="contained" color="primary" onClick={this.openNewTaskDialog} className={classes.typography} className={classes.button}>
                        add new task
                      </Button>
                    </Typography>
                  </Paper>
            )}
          </Grid>
        </Grid>
        <Button variant="fab" onClick={this.openNewTaskDialog} className={classes.floatingButton} color='primary'>
          <AddIcon />
        </Button>
        <NewTask open={this.state.newTaskDialogOpen} close={this.closeNewTaskDialog}/>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.snackbar.open}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbar.message}</span>}
        />
      </div>
    )
  }

  /**
   * the render method have to be untouched. it's belogned to MainLayout component to handle the data in page
   */
  render(){
    return <MainLayout pageTitle={this.pageTitle} content={this.content}/>;
  }
}

export default withStyles(styles)(Dashboard);