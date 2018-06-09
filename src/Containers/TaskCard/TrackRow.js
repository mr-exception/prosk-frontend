import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
});

class TrackRow extends React.Component {
  render() {
    const { item, index } = this.props;
    return (
      <TableRow key={index}>
        <TableCell>{index+1}</TableCell>
        <TableCell>{item.started_at}</TableCell>
        <TableCell>{item.finished_at}</TableCell>
        <TableCell>{item.description}</TableCell>
      </TableRow>
    );
  }
}

TrackRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackRow);