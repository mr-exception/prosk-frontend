import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

import red from '@material-ui/core/colors/red';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class TrackRow extends React.Component {
  render() {
    const { item, index, classes } = this.props;
    return (
      <TableRow>
        <TableCell>{index+1}</TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell>{item.started_at}</TableCell>
        <TableCell>{item.finished_at}</TableCell>
        <TableCell>
          <IconButton className={classes.button} style={{color: red[600], margin: 0, height: 24}} aria-label="Done">
            <i className="material-icons">delete</i>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

TrackRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackRow);