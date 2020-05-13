import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField
} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';

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

const AddReceiptInstrList = ({ instructionsList, onEdit, onCancel, onDelete }) => {
  const classes = useStyles();
  // Zbiór booleanów do zarządzania trybem edycji dla poszczególnych elementów listy
  const initialArray = Array(instructionsList.length).fill(false);
  const [listItems, setListItems] = useState(initialArray);
  const [originalContent, setOriginalContent] = useState('');

  const toggleEditingOnListItem = (id) => {
    // Przełączenie trybu edycji dla konkretnego elementu listy
    const listItemsModified = [...listItems];
    listItemsModified[id] = !listItemsModified[id];
    setListItems(listItemsModified);
  };

  const handleOnDelete = ({ currentTarget }) => {
    const currListItemId = currentTarget.parentElement.dataset.id;
    onDelete(currListItemId);
  };
  const handleOnCancel = ({ currentTarget }) => {
    const currListItemId = currentTarget.parentElement.dataset.id;
    toggleEditingOnListItem(currListItemId);
    onCancel(currListItemId, originalContent);
  };
  const handleOnEdit = ({ currentTarget }) => {
    // Zapisanie orginalnej zawartości elementu listy
    const span = currentTarget.parentElement.parentElement.querySelector('span');
    if (span) {
      setOriginalContent(span.innerText);
    }
    //
    const currListItemId = currentTarget.parentElement.dataset.id;
    toggleEditingOnListItem(currListItemId);
  };
  const handleOnChange = ({ target }) => {
    // Będąc w trybie edycji, zmieniany jest state u źródła (w komponencie rodzica),
    // aby pisać w czasie rzeczywistym
    const currListItemId = target.parentElement.parentElement.parentElement.dataset.id;
    onEdit(currListItemId, target.value);
  };

  return (
    // Po zastosowaniu <List> znikają punktory, nawet po ustawieniu stylu typu listy. Dlatego pozostał natywny <ol>
    <ol className={classes.zebraList}>
      {instructionsList.length ? (
        instructionsList.map((text, i) => (
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
                    onClick={
                      listItems[i] ? handleOnCancel : handleOnDelete
                    }
                  >
                    {listItems[i] ? <CancelIcon /> : <DeleteIcon />}
                  </IconButton>
                </ListItemSecondaryAction>
              </div>
            </li>
          </ListItem>
        ))
      ) : (
        <ListItem button>
          <ListItemText style={{ width: '100%', textAlign: 'center' }}>
            Wprowadź pierwszą instrukcję w powyższym polu
          </ListItemText>
        </ListItem>
      )}
    </ol>
  );
}
 
export default AddReceiptInstrList;