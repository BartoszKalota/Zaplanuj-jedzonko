import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  editBtn: {
    color: theme.palette.warning.main
  },
  deleteBtn: {
    color: theme.palette.error.main,
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: 12
    }
  }
}));

const TableEditRemoveBtns = () => {
  const classes = useStyles();

  const handleOnEdit = () => console.log('edit');
  const handleOnDelete = () => console.log('delete');

  return (
    <div className={classes.buttonsContainer}>
      <IconButton
        aria-label="edit-item"
        className={classes.editBtn}
        onClick={handleOnEdit}
      >
        <BorderColorIcon />
      </IconButton>
      <IconButton
        aria-label="delete-item"
        className={classes.deleteBtn}
        onClick={handleOnDelete}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
 
export default TableEditRemoveBtns;