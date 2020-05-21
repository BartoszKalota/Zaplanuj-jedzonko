import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    width: 110,
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
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
  },
  duplicateBtn: {
    color: theme.palette.success.main
  },
  printBtn: {
    color: theme.palette.info.main,
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: 12
    }
  }
}));

const TableButtons = ({ onEdit, onDelete, onDuplicate, onPrint }) => {
  const classes = useStyles();

  const handleOnClick = ({ currentTarget }) => {
    const currFirebaseId = currentTarget.parentElement.parentElement.parentElement.dataset.id;
    const currId = currentTarget.parentElement.parentElement.parentElement.querySelector('td').innerText - 1;
    const buttonType = currentTarget.getAttribute('aria-label');
    switch (buttonType) {
      case 'delete-item':
        onDelete(currFirebaseId, currId);
        break;
      case 'edit-item':
        onEdit(currFirebaseId);
        break;
      case 'duplicate-item':
        onDuplicate(currFirebaseId);
        break;
      default:
        onPrint(currFirebaseId);
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
      <IconButton
        aria-label="duplicate-item"
        className={classes.duplicateBtn}
        onClick={handleOnClick}
      >
        <FileCopyIcon />
      </IconButton>
      <IconButton
        aria-label="print-item"
        className={classes.printBtn}
        onClick={handleOnClick}
      >
        <PrintIcon />
      </IconButton>
    </div>
  );
}
 
export default TableButtons;