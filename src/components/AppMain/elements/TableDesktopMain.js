import React, { useState, useEffect, useContext } from 'react';
import { withFirebaseHOC } from '../../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import { 
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import { MsgYellowContext } from '../../../config/contexts/MsgYellowContext';
import { IsLoadingContext } from '../../../config/contexts/IsLoadingContext';

const useStyles = makeStyles(theme => ({
  tableTitle: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    fontSize: '1.3rem',
    fontWeight: 'bold'
  },
  tableContainer: {
    width: '100%'
  },
  table: {
    height: `calc(100vh - 460px)`,
    overflow: 'auto',
    '& table': {
      height: '100%'
    }
  },
  tableHeader: {
    fontSize: '1.0rem',
    fontWeight: 'bold',
    lineHeight: '1.8rem',
    textTransform: 'uppercase',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.3rem'
    }
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
  },
  pagination: {
    '& ul': {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0)
    }
  }
}));

// Kolumny
const columns = [
  { id: 'mon', label: 'poniedziałek', align: 'center', width: '14.8%', minWidth: 80 },
  { id: 'tue', label: 'wtorek', align: 'center', width: '14.2%', minWidth: 60 },
  { id: 'wed', label: 'środa', align: 'center', width: '14.2%', minWidth: 60 },
  { id: 'thu', label: 'czwartek', align: 'center', width: '14.2%', minWidth: 60 },
  { id: 'fri', label: 'piątek', align: 'center', width: '14.2%', minWidth: 60 },
  { id: 'sat', label: 'sobota', align: 'center', width: '14.2%', minWidth: 60 },
  { id: 'sun', label: 'niedziela', align: 'center', width: '14.2%', minWidth: 60 }
];

const TableDesktopMain = ({ firebase }) => {
  const classes = useStyles();
  const [weekNumber, setWeekNumber] = useState(1);
  const [schedules, setSchedules] = useState([]);
  const [rows, setRows] = useState([]);
  const { setSchedulesNum } = useContext(MsgYellowContext);
  const { setIsLoading } = useContext(IsLoadingContext);

  const setWeekNumAndRowsBasedOnCurrSchedule = (weekNum, schedule) => {
    const createSingleObject = (mealType) => {
      return Object.keys(schedule)
        .filter(key => key.includes(mealType))
        .reduce((obj, key) => {
          obj[key] = schedule[key];
          return obj;
        }, {});
    };
    const breakfasts = createSingleObject('breakf');
    const secondBreakfasts = createSingleObject('secBr');
    const soups = createSingleObject('soup');
    const dinners = createSingleObject('dinner');
    const suppers = createSingleObject('supper');
    const array = [breakfasts, secondBreakfasts, soups, dinners, suppers];
    setWeekNumber(weekNum);
    setRows(array);
  };

  // Zbiór planów (dane z Firebase) + Przygotowanie wierszy danego planu
  const userId = firebase.auth().currentUser.uid;
  useEffect(() => {
    setIsLoading(true);
    const schedules = [];
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('schedules')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const { weekNum, schedule } = doc.data();
          schedules.push({
            firebaseId: doc.id,
            weekNum,
            schedule
          });
          schedules.sort((a, b) => a.weekNum - b.weekNum);
          setSchedules(schedules);
        });
      })
      .then(() => {
        setSchedulesNum(schedules.length);
        if (schedules[0]) { // potrzebne, bo przy braku planów, wykrzacza błąd przy destrukturyzacji
          const { weekNum, schedule } = schedules[0];
          setWeekNumAndRowsBasedOnCurrSchedule(weekNum, schedule);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
        setIsLoading(false);
      });
  }, [firebase, userId, setIsLoading, setSchedulesNum]);

  const handleOnScheduleChange = (e, page) => {
    e.preventDefault();
    const { weekNum, schedule } = schedules[page - 1];
    setWeekNumAndRowsBasedOnCurrSchedule(weekNum, schedule);
  };

  return (
    <>
      <Typography component="p" color="secondary" className={classes.tableTitle}>
        {`Twój plan na ${weekNumber} tydzień:`}
      </Typography>
      <Paper className={classes.tableContainer}>
        <TableContainer className={classes.table}>
          <Table stickyHeader aria-label="table">
            <TableHead>
              <TableRow>
                {columns.map(({ id, label, align, width, minWidth }) => (
                  <TableCell
                    key={id}
                    align={align}
                    style={{ width, minWidth }}
                    component="th"
                    scope="col"
                    className={classes.tableHeader}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length ? (
                rows.map((row, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    {columns.map(column => {
                      const array = Object.keys(row).filter(key => key.substring(0, 3) === column.id)
                      const [ rowKeyName ] = array;
                      const value = row[rowKeyName];
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
        <Divider />
        <Pagination
          count={schedules.length}
          color="secondary"
          className={classes.pagination}
          // użycie funkcji strzałkowej, aby pobrać do handlera aktualny numer strony
          onChange={(e, page) => handleOnScheduleChange(e, page)}
        />
      </Paper>
    </>
  );
};
 
export default withFirebaseHOC(TableDesktopMain);