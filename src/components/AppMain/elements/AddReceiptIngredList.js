import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField
} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  zebraList: {
    '& > div:nth-child(2n+1)': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    '& > div:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  },
  dataListItem: {
    padding: '12px 0 12px 30px'
  },
  dataListItemContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  dataListItemText: {
    paddingLeft: 5
  },
  dataListItemTextEditable: {
    width: '100%',
    '& > div': {
      marginRight: 5,
      padding: theme.spacing(1.5, 2),
    }
  },
  dataListItemButtons: {
    minWidth: 100,
    position: 'static',
    transform: 'unset',
    paddingRight: 15
  },
  editBtn: {
    color: theme.palette.warning.main
  },
  confirmBtn: {
    color: theme.palette.success.main
  },
  deleteBtn: {
    color: theme.palette.error.main,
    marginLeft: 12
  }
}));

const AddReceiptIngredList = ({ ingredientsList, onEdit, onDelete }) => {
  const classes = useStyles();
  // Zbiór booleanów do zarządzania trybem edycji dla poszczególnych elementów listy
  const initialArray = Array(ingredientsList.length).fill(false);
  const [listItems, setListItems] = useState(initialArray);

  const handleOnDelete = ({ currentTarget }) => {
    const currListItemId = currentTarget.parentElement.dataset.id;
    onDelete(currListItemId);
  };
  const handleOnEdit = ({ currentTarget }) => {
    // Zarządzanie trybem edycji dla poszczególnych elementów listy
    const currListItemId = currentTarget.parentElement.dataset.id;
    const listItemsModified = [...listItems];
    listItemsModified[currListItemId] = !listItemsModified[currListItemId];
    setListItems(listItemsModified);
  };
  const handleOnChange = ({ target }) => {
    // Będąc w trybie edycji, zmieniany jest state u źródła (w komponencie rodzica)
    const currListItemId = target.parentElement.parentElement.parentElement.dataset.id;
    onEdit(currListItemId, target.value);
  };
  
  return (
    <List className={classes.zebraList}>
      {ingredientsList.length ? (
        ingredientsList.map((text, i) => (
          <ListItem key={i} button className={classes.dataListItem}>
            <li style={{ width: '100%' }}>
              <div data-id={i} className={classes.dataListItemContainer}>
                {listItems[i] ? (
                  <TextField
                    className={classes.dataListItemTextEditable}
                    defaultValue={text}
                    variant="outlined"
                    multiline
                    onChange={handleOnChange}
                  />
                ) : (
                  <ListItemText className={classes.dataListItemText}>
                    {text}
                  </ListItemText>
                )}
                <ListItemSecondaryAction data-id={i} className={classes.dataListItemButtons}>
                  <IconButton
                    edge="end"
                    aria-label="edit-item"
                    className={
                      listItems[i] ? classes.confirmBtn : classes.editBtn
                    }
                    onClick={handleOnEdit}
                  >
                    {listItems[i] ? <CheckCircleIcon /> : <BorderColorIcon />}
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete-item"
                    className={classes.deleteBtn}
                    onClick={handleOnDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </div>
            </li>
          </ListItem>
        ))
      ) : (
        <ListItem button>
          <ListItemText style={{ width: '100%', textAlign: 'center' }}>
            Wprowadź pierwszy składnik w powyższym polu
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
}
 
export default AddReceiptIngredList;