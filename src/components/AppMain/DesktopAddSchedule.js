import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withFirebaseHOC } from '../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import {
  Divider,
  Button,
  Grid,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';

import { IsLoadingContext } from '../../config/contexts/IsLoadingContext';

import * as ROUTES from '../../config/ROUTES';

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'left'
  },
  buttonContainer: {
    justifyContent: 'flex-end'
  },
  button: {
    fontWeight: 'bold',
    color: '#FFF'
  },
  outlinedInput: {
    width: '100%',
    '& > input': {
      padding: theme.spacing(1.5, 2)
    }
  },
  labelForWeekNum: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingRight: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
      justifyContent: 'center'
    }
  },
  outlinedInputForWeekNum: {
    marginRight: theme.spacing(2),
    '& > input': {
      maxWidth: 30,
      textAlign: 'center',
      padding: theme.spacing(1.5, 1),
    },
    // Usunięcie strzałek w inpucie (type="number") dla numeru tygodnia
    '& > input::-webkit-outer-spin-button, & > input::-webkit-inner-spin-button': {
      appearance: 'none',
      margin: 0
    },
    '& > input[type=number]': {
      appearance: 'textfield'
    }
  },
  errorMsg: {
    color: theme.palette.error.main
  },
  table: ({ name, descr, schedule }) => {
    let addValue = 0;
    if (name) {
      addValue += 24;
    }
    if (descr) {
      addValue += 24;
    }
    if (schedule) {
      addValue += 25;
    }
    return {
      height: `calc(100vh - ${465 + addValue}px)`,
      overflow: 'auto',
      '& table': {
        height: '100%'
      }
    };
  },
  tableHeader: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    lineHeight: '1.8rem',
    textTransform: 'uppercase',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 2)
  },
  tableColumnHeader: {
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  tableColumn: {
    padding: theme.spacing(0, 2)
  }
}));

const DesktopAddSchedule = ({ firebase }) => {
  const history = useHistory();
  const { setIsLoading } = useContext(IsLoadingContext);
  const [receipts, setReceipts] = useState([]);
  const valuesInitialState = {
    name: '',
    descr: '',
    weekNum: '',
    schedule: {
      mon_breakf: '', mon_secBr: '', mon_soup: '', mon_dinner: '', mon_supper: '',
      tue_breakf: '', tue_secBr: '', tue_soup: '', tue_dinner: '', tue_supper: '',
      wed_breakf: '', wed_secBr: '', wed_soup: '', wed_dinner: '', wed_supper: '',
      thu_breakf: '', thu_secBr: '', thu_soup: '', thu_dinner: '', thu_supper: '',
      fri_breakf: '', fri_secBr: '', fri_soup: '', fri_dinner: '', fri_supper: '',
      sat_breakf: '', sat_secBr: '', sat_soup: '', sat_dinner: '', sat_supper: '',
      sun_breakf: '', sun_secBr: '', sun_soup: '', sun_dinner: '', sun_supper: '',
    }
  };
  const [values, setValues] = useState({ ...valuesInitialState });
  const errorsInitialState = {
    name: '',
    descr: '',
    weekNum: '',
    schedule: ''
  };
  const [errors, setErrors] = useState({ ...errorsInitialState });
  const classes = useStyles(errors);  // przesłanie errors do zarządzania stylem 'table'

  // Kolumny
  const columns = [
    { id: 'header', label: '', align: 'center', width: '17%', minWidth: 120 },
    { id: 'breakf', label: 'śniadanie', align: 'center', width: '16.6%', minWidth: 100 },
    { id: 'secBr', label: 'drugie śniadanie', align: 'center', width: '16.6%', minWidth: 100 },
    { id: 'soup', label: 'zupa', align: 'center', width: '16.6%', minWidth: 100 },
    { id: 'dinner', label: 'drugie danie', align: 'center', width: '16.6%', minWidth: 100 },
    { id: 'supper', label: 'kolacja', align: 'center', width: '16.6%', minWidth: 100 }
  ];
  // Wiersze
  const rows = [
    { id: 'mon', label: 'poniedziałek' },
    { id: 'tue', label: 'wtorek' },
    { id: 'wed', label: 'środa' },
    { id: 'thu', label: 'czwartek' },
    { id: 'fri', label: 'piątek' },
    { id: 'sat', label: 'sobota' },
    { id: 'sun', label: 'niedziela' }
  ];
  // Przepisy (dane z Firebase)
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
        snapshot.docs.forEach(doc => {
          const { name } = doc.data();
          array.push(name);
        });
      })
      .then(() => {
        setReceipts(array);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
        setIsLoading(false);
      });
  }, [firebase, userId, setIsLoading]);

  const handleOnChange = ({target: {name, value}}) => {
    setValues({
      ...values,
      [name]: value
    });
  };
  const isNumberKey = ({target: {value}}) => {  // blokada przed wpisywaniem znaków innych niż cyfry (samo type="number" nie wystarczyło)
    const charCode = (value.which) ? value.which : value.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      setValues({
        ...values,
        weekNum: ''
      });
    }
  };
  const handleOnBlur = ({target: {name}}) => {
    setErrors({
      ...errors,
      [name]: ''
    });
  };
  const handleOnSelectInputChange = (name, newInputValue) => {
    const schedule = {
      ...values.schedule,
      [name]: newInputValue
    };
    setValues({
      ...values,
      schedule
    });
  };
  const validateInputs = () => {
    const errors = {};
    const { name, descr, weekNum, schedule } = values;
    if (!name) {
      errors.name = 'Brak nazwy planu.';
    }
    if (!descr) {
      errors.descr = 'Brak opisu planu.';
    }
    if (!weekNum) {
      errors.weekNum = 'Brak numeru tygodnia.';
    }
    const selectValuesArr = Object.values(schedule).filter(item => !item.length);
    if (selectValuesArr.length) {
      errors.schedule = 'Uzupełnij brakujące rubryki w tabeli.';
    }
    setErrors(errors);
    if (!!Object.entries(errors).length) {
      return false;
    }
    return true;
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const isValidated = validateInputs();
    if (isValidated) {
      const { name, descr, weekNum, schedule } = values;
      setIsLoading(true);
      firebase.firestore()
        .collection('users')
        .doc(userId)
        .collection('schedules')
        .doc()
        .set({ name, descr, weekNum, schedule })
        .then(() => {
          setValues({ ...valuesInitialState });
          setErrors({ ...errorsInitialState });
          setIsLoading(false);
        })
        .then(() => history.push(ROUTES.SCHEDULE))
        .catch(err => {
          console.log(err);
          alert('Błąd połączenia! Zajrzyj do konsoli.');
          setIsLoading(false);
        });
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleOnSubmit}>
      <Grid container style={{ paddingBottom: 15 }}>
        <Grid item xs={6}>
          <Typography className={classes.heading} variant="h5" component="h2" color="secondary">
            NOWY PLAN
          </Typography>
        </Grid>
        <Grid item container className={classes.buttonContainer} xs={6}>
          <Button className={classes.button} type="submit" variant="contained" color="secondary">
            Zapisz i zamknij
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Grid item container xs={12} md={3} justify="center" alignItems="flex-start">
          <Typography variant="h6" component="label" htmlFor="schedule-name" align="center">
            Nazwa planu
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <OutlinedInput
            id="schedule-name"
            className={classes.outlinedInput}
            type="text"
            name="name"
            value={values.name}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            variant="outlined"
            color="secondary"
            placeholder="Plan jarski na bezmięsny tydzień"
            inputProps={{ 'aria-label': 'schedule-name' }}
          />
          {errors.name && (
            <Typography component="p" className={classes.errorMsg}>
              {errors.name}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container style={{ paddingBottom: 10 }}>
        <Grid item container xs={12} md={3} justify="center" alignItems="flex-start">
          <Typography variant="h6" component="label" htmlFor="schedule-description" align="center">
            Opis planu
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <OutlinedInput
            id="schedule-description"
            className={classes.outlinedInput}
            type="text"
            name="descr"
            value={values.descr}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            multiline
            rows={3}
            variant="outlined"
            color="secondary"
            placeholder="Pojęcie kuchnia wegetariańska określa pożywienie, które ani nie zawiera mięsa, ani nie zostało przygotowane na bazie pochodzącej z mięsa (np. na rosole drobiowym). Laktoowowegetarianie (najczęściej spotykany typ wegetarian w zachodnim świecie) spożywiają nabiał, laktowegetarianie wykluczają jaja, ale nie inne produkty nabiałowe."
            inputProps={{ 'aria-label': 'schedule-description' }}
          />
          {errors.descr && (
            <Typography component="p" className={classes.errorMsg}>
              {errors.descr}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Grid item container xs={6} md={3} className={classes.labelForWeekNum}>
          <Typography variant="h6" component="label" htmlFor="schedule-week-number" align="center">
            Numer tygodnia
          </Typography>
        </Grid>
        <Grid item container xs={6} md={9} justify="flex-start" alignItems="center">
          <OutlinedInput
            id="schedule-week-number"
            className={classes.outlinedInputForWeekNum}
            type="number"
            name="weekNum"
            value={values.weekNum}
            onChange={handleOnChange}
            onKeyPress={isNumberKey}
            onBlur={handleOnBlur}
            variant="outlined"
            color="secondary"
            placeholder="5"
            inputProps={{ 'aria-label': 'schedule-week-number' }}
          />
          {errors.weekNum && (
            <Typography component="p" className={classes.errorMsg}>
              {errors.weekNum}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item container direction="column">
        {errors.schedule && (
          <>
            <Divider />
            <Typography component="p" className={classes.errorMsg} style={{ textAlign: 'center' }}>
              {errors.schedule}
            </Typography>
          </>
        )}
        <TableContainer component={Paper} className={classes.table}>
          <Table stickyHeader aria-label="table">
            <TableHead>
              <TableRow>
                {columns.map(({ id, label, align, width, minWidth }) => (
                  <TableCell
                    key={id}
                    align={align}
                    style={{ width, minWidth }}
                    className={classes.tableHeader}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  {columns.map(column => column.id === 'header' ? (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      component="th"
                      scope="row"
                      className={classes.tableColumnHeader}
                    >
                      {row.label}
                    </TableCell>
                  ) : (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      className={classes.tableColumn}
                    >
                      <Autocomplete 
                        inputValue={values.schedule[`${row.id}_${column.id}`]}
                        // Ten select (z material-ui) bardzo utrudnia posługiwanie się e.targetem.
                        // Dlatego konieczna jest tutaj funkcja strzałkowa, aby przenieść odpowiednie dane do handlera
                        onInputChange={(e, newInputValue) => handleOnSelectInputChange(`${row.id}_${column.id}`, newInputValue)}
                        options={receipts}
                        size="small"
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="Zapiekanka z ziemniakami i brukselką"
                            color="secondary"
                            variant="outlined"
                          />
                        )}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </form>
  );
};
 
export default withFirebaseHOC(DesktopAddSchedule);