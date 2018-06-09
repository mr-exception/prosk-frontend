import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Enviroment from '../../Enviroment';


const styles = (theme) => ({
	root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolBar: {
    textAlign: "center"
  },
})
class Main extends React.Component {
  state = {
		right: true
  };

  render() {
    const { classes } = this.props;
    document.title = `${Enviroment.title} - ${this.props.pageTitle}`
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {Enviroment.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          {this.props.content()}
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  pageTitle: PropTypes.string.isRequired,
  content: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);