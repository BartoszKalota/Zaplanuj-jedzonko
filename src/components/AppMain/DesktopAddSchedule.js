import React, { useState } from 'react';
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
    '& > input': {
      maxWidth: 30,
      textAlign: 'center',
      padding: theme.spacing(1.5, 1)
    }
  },
  errorMsg: {
    color: theme.palette.error.main
  },
  table: {
    height: 'calc(100vh - 465px)',
    overflow: 'auto',
    '& table': {
      height: '100%'
    }
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

const options = ['Option 1', 'Option 2', 'Dupa', 'Żopa', 'Test'];

const DesktopAddSchedule = () => {
  const classes = useStyles();
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

  const handleOnChange = ({target: {name, value}}) => {
    setValues({
      ...values,
      [name]: value
    });
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

  return (
    <form autoComplete="off">
      <Grid container style={{ paddingBottom: 15 }}>
        <Grid item xs={6}>
          <Typography className={classes.heading} variant="h5" component="h2" color="secondary">
            NOWY PLAN
          </Typography>
        </Grid>
        <Grid item container className={classes.buttonContainer} xs={6}>
          <Button className={classes.button} variant="contained" color="secondary">
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
        <Grid item container xs={6} md={9} justify="flex-start">
          <OutlinedInput
            id="schedule-week-number"
            className={classes.outlinedInputForWeekNum}
            type="text"
            name="weekNum"
            value={values.weekNum}
            onChange={handleOnChange}
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
      <Grid item container>
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
                        options={options}
                        size="small"
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder={options[0]}
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
 
export default DesktopAddSchedule;