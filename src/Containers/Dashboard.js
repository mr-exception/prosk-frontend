import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MainLayout from './Layouts/Main';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 20,
    marginRight: 20,
    marginTop: theme.spacing.unit * 3,
  }),
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
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
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