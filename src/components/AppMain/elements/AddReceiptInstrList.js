import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  dataListItem: {
    padding: '12px 0 12px 30px'
  },
  dataListItemText: {
    paddingLeft: 5,
    paddingRight: 105
  },
  editBtn: {
    color: theme.palette.warning.main
  },
  deleteBtn: {
    color: theme.palette.error.main,
    marginLeft: 12
  }
}));

const AddReceiptInstrList = ({ instructionsList, onDelete }) => {
  const classes = useStyles();

  const handleOnClick = ({ currentTarget }) => {
    const buttonLabel = currentTarget.getAttribute('aria-label');
    const currListItemId = currentTarget.parentElement.parentElement.parentElement.dataset.id;
    if (buttonLabel === 'delete-item') {
      onDelete(currListItemId);
    } else {
      console.log('edit method');
    }
  };

  return (
    <ol>
      {instructionsList.length ? (
        instructionsList.map((text, i) => (
          <ListItem key={i} data-id={i} button className={classes.dataListItem}>
            <li>
              <ListItemText className={classes.dataListItemText}>
                {text}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit-item"
                  className={classes.editBtn}
                  onClick={handleOnClick}
                >
                  <BorderColorIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete-item"
                  className={classes.deleteBtn}
                  onClick={handleOnClick}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </li>
          </ListItem>
        ))
      ) : (
        <ListItem button>
          <ListItemText style={{ width: '100%', textAlign: 'center' }}>
            Wpisz pierwszą instrukcję w polu powyżej
          </ListItemText>
        </ListItem>
      )}
    </ol>
  );
}
 
export default AddReceiptInstrList;