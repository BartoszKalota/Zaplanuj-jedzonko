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
import printJS from 'print-js';

import { IsLoadingContext } from '../../config/contexts/IsLoadingContext';
import { IdClipboard } from '../../config/contexts/IdClipboard';
import { DesktopSwitcher } from '../../config/contexts/DesktopSwitcher';

import * as ROUTES from '../../config/ROUTES';
import { getComparator, stableSort } from '../../config/sortingFunctions';
import DialogModal from './auth/Dialog';
import TableButtons from './elements/TableButtons';

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
      backgroundColor: theme.palette.tableRowDark
    },
    '&:hover': {
      backgroundColor: theme.palette.tableRowHover
    }
  }
}));

// Kolumny
const columns = [
  { id: 'id', label: 'ID', align: 'left', minWidth: 50 },
  { id: 'name', label: 'NAZWA', align: 'left', minWidth: 170 },
  { id: 'descr', label: 'OPIS', align: 'left', minWidth: 230 },
  { id: 'weekNum', label: 'TYDZIEŃ', align: 'left', minWidth: 120 },
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

const Schedule = ({ firebase }) => {
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
      .collection('schedules')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach((doc, index) => {
          const { name, descr, weekNum } = doc.data(); // potrzebujemy tylko kilku danych (nie wszystkich)
          array.push({
            firebaseId: doc.id,
            id: index,    // wstawione aby umożliwić funkcję sortowania wg ID w tabeli
            name,
            descr,
            weekNum
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
  }, []);
  
  const handleOnSearch = (e) => {
    e.preventDefault();
    // Pobranie wszystkich planów w celu wykonania selekcji
    setIsLoading(true);
    const array = [];
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('schedules')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach((doc, index) => {
          const { name, descr, weekNum } = doc.data(); // potrzebujemy tylko kilku danych (nie wszystkich)
          array.push({
            firebaseId: doc.id,
            id: index,    // wstawione aby umożliwić funkcję sortowania wg ID w tabeli
            name,
            descr,
            weekNum
          });
        });
      })
      .then(() => {
        // Przeszukanie pierwszej kolumny tabeli
        const resultsByName = array.filter(el => el.name.includes(searchQuery));
        // Przeszukanie drugiej kolumny tabeli
        const resultsByDescr = array.filter(el => el.descr.includes(searchQuery));
        // Przeszukanie trzeciej kolumny tabeli
        const resultsByWeekNum = array.filter(el => el.weekNum.includes(searchQuery));
        // Usunięcie ewentualnych powtórek w wynikach wyszukiwania
        const resultsComplete = [...resultsByName, ...resultsByDescr, ...resultsByWeekNum];
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
    setDesktopMode(3);
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
      .collection('schedules')
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
    setDesktopMode(5);
    history.push(ROUTES.DESKTOP);
  };
  const handleOnDuplicateReceipt = (firebaseId) => {
    setIsLoading(true);
    const schedulesRef = firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('schedules');
    // Pobranie pełnych danych do skopiowania
    schedulesRef
      .doc(firebaseId)
      .get()
      .then(doc => {
        const { name, descr, weekNum, schedule } = doc.data();
        // Zapisanie skopiowanych danych pod szyldem nowego elementu w Firebase
        schedulesRef
          .doc()
          .set({ name, descr, weekNum, schedule })
          .catch(err => {
            console.log(err);
            alert('Błąd połączenia! Zajrzyj do konsoli.');
            setIsLoading(false);
          });
      })
      .then(() => {
        const rowsWithDuplicatedItem = [];
        // Umieszczenie zduplikowanego elementu na końcu tabeli
        schedulesRef
          .get()
          .then(snapshot => {
            snapshot.docs.forEach((doc, index) => {
              const { name, descr, weekNum } = doc.data();
              rowsWithDuplicatedItem.push({
                firebaseId: doc.id,
                id: index,
                name,
                descr,
                weekNum
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
  const handleOnPrintReceipt = (firebaseId) => {
    setIsLoading(true);
    // Pobranie pełnych danych do druku
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('schedules')
      .doc(firebaseId)
      .get()
      .then(doc => {
        const { name, descr, weekNum, schedule } = doc.data();
        // Tworzenie osobnych rubryk dla każdego dnia tygodnia (inaczej plan nie wyświetli się w PDFie)
        const createSingleObject = (day) => {
          return Object.keys(schedule)
            .filter(key => key.includes(day))
            .reduce((obj, key) => {
              obj[key] = schedule[key];
              return obj;
            }, {});
        };
        const mondayObj = createSingleObject('mon');
        const { mon_breakf, mon_secBr, mon_soup, mon_dinner, mon_supper } = mondayObj;
        const mondayArr = [mon_breakf, mon_secBr, mon_soup, mon_dinner, mon_supper]; // poprawna kolejność dań
        let monday = ``;  // zapis umożliwiający (1) dodanie punktorów oraz (2) zawijanie wierszy w kolumnie tabeli
        for (let i = 0; i < mondayArr.length; i++) {
          monday += `(${i + 1}) ${mondayArr[i]}. \n`;
        }
        const tuesdayObj = createSingleObject('tue');
        const { tue_breakf, tue_secBr, tue_soup, tue_dinner, tue_supper } = tuesdayObj;
        const tuesdayArr = [tue_breakf, tue_secBr, tue_soup, tue_dinner, tue_supper];
        let tuesday = ``;
        for (let i = 0; i < tuesdayArr.length; i++) {
          tuesday += `(${i + 1}) ${tuesdayArr[i]}. \n`;
        }
        const wednesdayObj = createSingleObject('wed');
        const { wed_breakf, wed_secBr, wed_soup, wed_dinner, wed_supper } = wednesdayObj;
        const wednesdayArr = [wed_breakf, wed_secBr, wed_soup, wed_dinner, wed_supper];
        let wednesday = ``;
        for (let i = 0; i < wednesdayArr.length; i++) {
          wednesday += `(${i + 1}) ${wednesdayArr[i]}. \n`;
        }
        const thursdayObj = createSingleObject('thu');
        const { thu_breakf, thu_secBr, thu_soup, thu_dinner, thu_supper } = thursdayObj;
        const thursdayArr = [thu_breakf, thu_secBr, thu_soup, thu_dinner, thu_supper];
        let thursday = ``;
        for (let i = 0; i < thursdayArr.length; i++) {
          thursday += `(${i + 1}) ${thursdayArr[i]}. \n`;
        }
        const fridayObj = createSingleObject('fri');
        const { fri_breakf, fri_secBr, fri_soup, fri_dinner, fri_supper } = fridayObj;
        const fridayArr = [fri_breakf, fri_secBr, fri_soup, fri_dinner, fri_supper];
        let friday = ``;
        for (let i = 0; i < fridayArr.length; i++) {
          friday += `(${i + 1}) ${fridayArr[i]}. \n`;
        }
        const saturdayObj = createSingleObject('sat');
        const { sat_breakf, sat_secBr, sat_soup, sat_dinner, sat_supper } = saturdayObj;
        const saturdayArr = [sat_breakf, sat_secBr, sat_soup, sat_dinner, sat_supper];
        let saturday = ``;
        for (let i = 0; i < saturdayArr.length; i++) {
          saturday += `(${i + 1}) ${saturdayArr[i]}. \n`;
        }
        const sundayObj = createSingleObject('sun');
        const { sun_breakf, sun_secBr, sun_soup, sun_dinner, sun_supper } = sundayObj;
        const sundayArr = [sun_breakf, sun_secBr, sun_soup, sun_dinner, sun_supper];
        let sunday = ``;
        for (let i = 0; i < sundayArr.length; i++) {
          sunday += `(${i + 1}) ${sundayArr[i]}. \n`;
        }
        const itemToPrint = [{  // funkcja printJS wymaga danych JSON w formie tablicy
          name,
          descr,
          weekNum,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday
        }];
        const LOGO_FOR_PDF_URL = 'https://firebasestorage.googleapis.com/v0/b/zaplanuj-jedzonko.appspot.com/o/logoForPDF.jpg?alt=media&token=e01de362-0dca-498e-9e04-4900118942b9';
        printJS({
          printable: itemToPrint,
          properties: [
            { field: 'name', displayName: 'Nazwa' },
            { field: 'descr', displayName: 'Opis' },
            { field: 'weekNum', displayName: 'Numer tygodnia' },
            { field: 'monday', displayName: 'Poniedziałek' },
            { field: 'tuesday', displayName: 'Wtorek' },
            { field: 'wednesday', displayName: 'Środa' },
            { field: 'thursday', displayName: 'Czwartek' },
            { field: 'friday', displayName: 'Piątek' },
            { field: 'saturday', displayName: 'Sobota' },
            { field: 'sunday', displayName: 'Niedziela' }
          ],
          type: 'json',
          header: `
            <div class="print-header">
              <img class="print-logo" src=${LOGO_FOR_PDF_URL} title="Zaplanuj Jedzonko Logo" />
              <h1>Plan na tydzień nr ${weekNum}</h1>
            </div>
          `,
          style: `
            .print-header {
              display: flex;
              flex-direction: column;
              align-items: center; 
            }
            .print-logo {
              width: 300px;
            }
          `,
          gridHeaderStyle: 'border: 1px solid lightgrey;',
          gridStyle: 'border: 1px solid lightgrey; padding: 10px;'
        });
      })
      .then(() => setIsLoading(false))
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
        setIsLoading(false);
      });
  };

  // Informacja do okna dialogowego
  const infoTitle = 'Element zduplikowany!';
  const infoMsg = 'Duplikat znajdziesz na dole tabeli (jeżeli jest włączone sortowanie rosnące wg ID).';

  return (
    <>
      <Grid container direction="column">
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <Typography className={classes.heading} variant="h5" component="h2" color="secondary">
              LISTA PLANÓW
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
                          let value = row[column.id];   // wartości pól column.id muszą być takie same jak te, które przyszły z Firebase ( array.push({ id, name, descr, ... }) )
                          if (column.id === 'id') {
                            value = row.id + 1;
                          }
                          if (column.id === 'actions') {
                            value = (
                              <TableButtons
                                onEdit={handleOnEditReceipt}
                                onDelete={handleOnDeleteReceipt}
                                onDuplicate={handleOnDuplicateReceipt}
                                onPrint={handleOnPrintReceipt}
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
                      Brak planów do wyświetlenia
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
}
 
export default withFirebaseHOC(Schedule);