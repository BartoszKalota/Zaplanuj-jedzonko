import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withFirebaseHOC } from '../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { IsLoadingContext } from '../../config/contexts/IsLoadingContext';
import { IdClipboard } from '../../config/contexts/IdClipboard';
import { DesktopSwitcher } from '../../config/contexts/DesktopSwitcher';

import * as ROUTES from '../../config/ROUTES';
import TableEditRemoveBtns from './elements/TableEditRemoveBtns';

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'left'
  },
  buttonContainer: {
    justifyContent: 'flex-end'
  },
  addDataButton: {
    minWidth: 'unset',
    color: theme.palette.success.main,
    padding: 0,
    marginLeft: theme.spacing(1),
    '& span svg': {
      fontSize: '2.5rem'
    }
  },
  table: {
    height: 'calc(100vh - 220px)',
    overflow: 'auto'
  },
  tableHeader: {
    fontSize: '1.3rem',
    textTransform: 'uppercase',
    backgroundColor: theme.palette.background.paper
  },
  tableHeaderSortLabel: {
    '&:hover': {
      color: theme.palette.secondary.main
    },
    '& svg': {
      color: [[theme.palette.secondary.main], '!important']
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  tableRow: {
    '& td': {
      fontSize: '0.95rem'
    },
    '&:nth-child(2n+1)': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  }
}));

// Funkcje sortowania
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};
const getComparator = (order, orderBy) => {
  return order === 'desc' ? (
    (a, b) => descendingComparator(a, b, orderBy)
  ) : (
    (a, b) => -descendingComparator(a, b, orderBy)
  );
};
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

// Kolumny
const columns = [
  { id: 'id', label: 'ID', align: 'left', minWidth: 50 },
  { id: 'name', label: 'NAZWA', align: 'left', minWidth: 170 },
  { id: 'descr', label: 'OPIS', align: 'left', minWidth: 230 },
  { id: 'actions', label: 'AKCJE', align: 'center', minWidth: 90 }
];

// Nagłówek tabeli
const TableHeaderWithSorting = ({ order, orderBy, onRequestSort }) => {
  const classes = useStyles();
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ id, label, align, minWidth }) => (
          <TableCell
            key={id}
            align={align}
            style={{ minWidth }}
            className={classes.tableHeader}
            sortDirection={
              orderBy === id ? order : false
            }
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={createSortHandler(id)}
              className={classes.tableHeaderSortLabel}
            >
              {label}
              {orderBy === id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
TableHeaderWithSorting.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired
};

const Receipt = ({ firebase }) => {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const { setIsLoading } = useContext(IsLoadingContext);
  const { setClipboardRowId } = useContext(IdClipboard);
  const { setDesktopMode } = useContext(DesktopSwitcher);

  // Wiersze (dane z Firebase)
  const userId = firebase.auth().currentUser.uid;
  useEffect(() => {
    setIsLoading(true);
    const array = [];
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('receipts')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach((doc, index) => {
          const { name, descr } = doc.data(); // potrzebujemy tylko kilku danych (nie wszystkich)
          array.push({
            id: index,    // zmienione z doc.id na index, aby umożliwić funkcję sortowania wg ID w tabeli
            name,
            descr
          })
        })
      })
      .then(() => {
        setRows(array);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
        setIsLoading(false);
      });
  }, [firebase, userId, setIsLoading]);

  const handleOnAddData = () => {
    setDesktopMode(2);
    history.push(ROUTES.DESKTOP);
  };
  const handleOnRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleOnDeleteReceipt = (rowId) => {
    setIsLoading(true);
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('receipts')
      .doc(rowId)
      .delete()
      .then(() => {
        const rowsWithoutDeletedItem = rows.filter(row => row.id !== rowId);
        setRows(rowsWithoutDeletedItem);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
        setIsLoading(false);
      });
  };
  const handleOnEditReceipt = (rowId) => {
    setClipboardRowId(rowId);
    setDesktopMode(4);
    history.push(ROUTES.DESKTOP);
  };

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={6}>
          <Typography className={classes.heading} variant="h5" component="h2" color="secondary">
            LISTA PRZEPISÓW
          </Typography>
        </Grid>
        <Grid item container className={classes.buttonContainer} xs={6}>
          <Button className={classes.addDataButton} onClick={handleOnAddData}>
            <AddBoxIcon />
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid item container>
        <TableContainer component={Paper} className={classes.table}>
          <Table stickyHeader aria-label="table">
            <TableHeaderWithSorting
              order={order}
              orderBy={orderBy}
              onRequestSort={handleOnRequestSort}
            />
            <TableBody>
              {rows.length ? (
                stableSort(rows, getComparator(order, orderBy))
                  .map(row => (
                    <TableRow key={row.id} data-id={row.id} className={classes.tableRow}>
                      {columns.map(column => {
                        let value = row[column.id];   // wartości pól column.id muszą być takie same jak te, które przyszły z Firebase ( array.push({ id, name, descr }) )
                        if (column.id === 'id') {
                          value = row.id + 1;
                        }
                        if (column.id === 'actions') {
                          value = (
                            <TableEditRemoveBtns
                              onEdit={handleOnEditReceipt}
                              onDelete={handleOnDeleteReceipt}
                            />
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              ) : (
                <TableRow className={classes.tableRow}>
                  <TableCell align="center" colSpan={columns.length}>
                    Brak przepisów do wyświetlenia
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default withFirebaseHOC(Receipt);