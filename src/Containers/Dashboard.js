import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MainLayout from './Layouts/Main';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import TaskCard from './TaskCard';

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
  };

  content = () => {
    const { classes } = this.props;
    return (
      <div>
        <Grid container justify='center' style={{marginTop: 15}}>
          <Grid item xs={8}>
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </Grid>
        </Grid>
        <Button variant="fab" className={classes.floatingButton} color='primary'>
          <AddIcon />
        </Button>
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