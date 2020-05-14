import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
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

const TableEditRemoveBtns = ({ onEdit, onDelete }) => {
  const classes = useStyles();

  const handleOnClick = ({ currentTarget }) => {
    const currFirebaseId = currentTarget.parentElement.parentElement.parentElement.dataset.id;
    const currId = currentTarget.parentElement.parentElement.parentElement.querySelector('td').innerText - 1;
    const buttonType = currentTarget.getAttribute('aria-label');
    if (buttonType === 'delete-item') {
      onDelete(currFirebaseId, currId);
    } else {
      onEdit(currFirebaseId);
    }
  };

  return (
    <div className={classes.buttonsContainer}>
      <IconButton
        aria-label="edit-item"
        className={classes.editBtn}
        onClick={handleOnClick}
      >
        <BorderColorIcon />
      </IconButton>
      <IconButton
        aria-label="delete-item"
        className={classes.deleteBtn}
        onClick={handleOnClick}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
 
export default TableEditRemoveBtns;