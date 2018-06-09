import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Input from '@material-ui/core/Input';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});
class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

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
  avatar: {
    backgroundColor: red[500],
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
const data = [
  {started_at: '2018-05-05 5:12:00', finished_at: '2018-06-19 6:18:12', description: 'Do fugiat sit aute est sit id velit excepteur sint fugiat commodo occaecat.'},
  {started_at: '2018-05-05 5:12:00', finished_at: '2018-06-19 6:18:12', description: 'Officia esse aute aliquip irure veniam eu ipsum culpa et est est ullamco veniam.'},
  {started_at: '2018-05-05 5:12:00', finished_at: '2018-06-19 6:18:12', description: 'Aliquip consequat exercitation commodo nostrud.'},
  {started_at: '2018-05-05 5:12:00', finished_at: '2018-06-19 6:18:12', description: 'Cupidatat sint qui voluptate irure.'},
  {started_at: '2018-05-05 5:12:00', finished_at: '2018-06-19 6:18:12', description: 'Ex labore elit velit exercitation deserunt amet cillum.'},
];
class TaskCard extends React.Component {
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
                <IconButton className={classes.button} aria-label="Done">
                  <i className="material-icons">check_circle</i>
                </IconButton>
              </Tooltip>,
              <Tooltip id="tooltip-icon" title="add custom track">
                <IconButton className={classes.button} aria-label="Delete">
                  <i className="material-icons">av_timer</i>
                </IconButton>
              </Tooltip>,
              <Tooltip id="tooltip-icon" title="remove task">
                <IconButton className={classes.button} aria-label="Delete">
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
              <IconButton aria-label="Stop">
                <i className="material-icons">stop</i>
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="start tracking">
              <IconButton aria-label="Start">
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
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell numeric>from</TableCell>
                    <TableCell numeric>to</TableCell>
                    <TableCell>description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{item.started_at}</TableCell>
                        <TableCell>{item.finished_at}</TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={4}
                      count={25}
                      rowsPerPage={10}
                      page={0}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

TaskCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskCard);