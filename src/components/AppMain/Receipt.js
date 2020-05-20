import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withFirebaseHOC } from '../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  OutlinedInput,
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
import SearchIcon from '@material-ui/icons/Search';

import { IsLoadingContext } from '../../config/contexts/IsLoadingContext';
import { IdClipboard } from '../../config/contexts/IdClipboard';
import { DesktopSwitcher } from '../../config/contexts/DesktopSwitcher';

import * as ROUTES from '../../config/ROUTES';
import { getComparator, stableSort } from '../../config/sortingFunctions';
import DialogModal from './auth/Dialog';
import TableEditRemoveBtns from './elements/TableButtons';

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'left'
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& > div': {
      width: '100%',
      paddingRight: 5
    },
    '& input': {
      width: '100%',
      padding: theme.spacing(1, 0, 1, 2)
    }
  },
  searchIconButton: {
    padding: 5
  },
  addDataButtonContainer: {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setIsLoading } = useContext(IsLoadingContext);
  const { setClipboardFirebaseId } = useContext(IdClipboard);
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
            firebaseId: doc.id,
            id: index,    // wstawione aby umożliwić funkcję sortowania wg ID w tabeli
            name,
            descr
          });
        });
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

  const handleOnSearch = (e) => {
    e.preventDefault();
    // Pobranie wszystkich przepisów w celu wykonania selekcji
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
            firebaseId: doc.id,
            id: index,    // wstawione aby umożliwić funkcję sortowania wg ID w tabeli
            name,
            descr
          });
        });
      })
      .then(() => {
        // Przeszukanie pierwszej kolumny tabeli
        const resultsByName = array.filter(el => el.name.includes(searchQuery));
        // Przeszukanie drugiej kolumny tabeli
        const resultsByDescr = array.filter(el => el.descr.includes(searchQuery));
        // Usunięcie ewentualnych powtórek w wynikach wyszukiwania
        const resultsComplete = [...resultsByName, ...resultsByDescr];
        const resultsWithoutRepetition = resultsComplete
          .map(el => el['firebaseId'])  // utworzenie tablicy zawierającej wartość klucza 'firebaseId' każdego obiektu
          .map((el, index, final) => final.indexOf(el) === index && index)  // przechowanie indeksów unikalnych obiektów
          .filter(el => resultsComplete[el])  // usunięcie powtórek z tablicy (wartości false) - pozostają indeksy unikalnych obiektów
          .map(el => resultsComplete[el]);  // zastąpienie indeksów pełnymi obiektami o podanch indeksach
        setRows(resultsWithoutRepetition);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
        setIsLoading(false);
      });
  };
  const handleOnChange = ({ target: { value }}) => setSearchQuery(value);
  const handleOnAddData = () => {
    setDesktopMode(2);
    history.push(ROUTES.DESKTOP);
  };
  const handleOnRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleOnDeleteReceipt = (firebaseId, rowId) => {
    setIsLoading(true);
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('receipts')
      .doc(firebaseId)
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
  const handleOnEditReceipt = (firebaseId) => {
    setClipboardFirebaseId(firebaseId);
    setDesktopMode(4);
    history.push(ROUTES.DESKTOP);
  };
  const handleOnDuplicateReceipt = (firebaseId) => {
    setIsLoading(true);
    // Pobranie pełnych danych do skopiowania
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('receipts')
      .doc(firebaseId)
      .get()
      .then(doc => {
        const { name, descr, instr, ingred } = doc.data();
        // Zapisanie skopiowanych danych pod szyldem nowego elementu w Firebase
        firebase.firestore()
          .collection('users')
          .doc(userId)
          .collection('receipts')
          .doc()
          .set({ name, descr, instr, ingred })
          .catch(err => {
            console.log(err);
            alert('Błąd połączenia! Zajrzyj do konsoli.');
            setIsLoading(false);
          });
      })
      .then(() => {
        const rowsWithDuplicatedItem = [];
        // Umieszczenie zduplikowanego elementu na końcu tabeli
        firebase.firestore()
          .collection('users')
          .doc(userId)
          .collection('receipts')
          .get()
          .then(snapshot => {
            snapshot.docs.forEach((doc, index) => {
              const { name, descr } = doc.data();
              rowsWithDuplicatedItem.push({
                firebaseId: doc.id,
                id: index,
                name,
                descr
              });
            });
          })
          .then(() => {
            const [ duplicatedItem ] = rowsWithDuplicatedItem.filter(item => !rows.find(({ firebaseId }) => item.firebaseId === firebaseId));
            duplicatedItem.id = rows.length;
            const updatedRows = [...rows, duplicatedItem];
            setRows(updatedRows);
            setIsLoading(false);
            setIsDialogOpen(true);
          })
          .catch(err => {
            console.log(err);
            alert('Błąd połączenia! Zajrzyj do konsoli.');
            setIsLoading(false);
          });
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
        setIsLoading(false);
      });
  };
  const handleOnDialogClose = () => setIsDialogOpen(false);

  // Informacja do okna dialogowego
  const infoTitle = 'Element zduplikowany!';
  const infoMsg = 'Duplikat znajdziesz na dole tabeli.';

  return (
    <>
      <Grid container direction="column">
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <Typography className={classes.heading} variant="h5" component="h2" color="secondary">
              LISTA PRZEPISÓW
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <form onSubmit={handleOnSearch}>
              <div className={classes.searchContainer}>
                <OutlinedInput
                  type="text"
                  name="searchField"
                  value={searchQuery}
                  onChange={handleOnChange}
                  color="secondary"
                  placeholder="Znajdź..."
                  inputProps={{ 'aria-label': 'search-field' }}
                  endAdornment={
                    <IconButton type="submit" className={classes.searchIconButton} aria-label="search-button">
                      <SearchIcon />
                    </IconButton>
                  }
                />
              </div>
            </form>
          </Grid>
          <Grid item container xs={2} md={4} className={classes.addDataButtonContainer}>
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
                      <TableRow key={row.firebaseId} data-id={row.firebaseId} className={classes.tableRow}>
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
                                onDuplicate={handleOnDuplicateReceipt}
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

      {/* Okno dialogowe z info o udanym powieleniu elementu */}
      <DialogModal
        infoTitle={infoTitle}
        infoMsg={infoMsg}
        isDialogOpen={isDialogOpen}
        onDialogClose={handleOnDialogClose}
      />
    </>
  );
};

export default withFirebaseHOC(Receipt);