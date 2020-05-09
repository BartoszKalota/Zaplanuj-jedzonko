import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Button,
  Grid,
  ListItem,
  OutlinedInput,
  Typography
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

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
  dataFormSection: {
    paddingTop: 20
  },
  dataFormColumnSection: {
    // height: '100%',
    // display: 'flex',
    // flexDirection: 'column'
  },
  dataInputSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    margin: theme.spacing(1, 0, 3, 0)
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
  dataList: {
    height: 'calc(100vh - 580px)',
    minHeight: 70,
    overflow: 'auto'
  }
}));

const DesktopAddReceipt = () => {
  const classes = useStyles();
  const valuesInitialState = {
    name: '',
    descr: '',
    instr: [],
    ingred: []
  };
  const [values, setValues] = useState({ ...valuesInitialState });
  const errorsInitialState = {
    name: '',
    descr: '',
    instr: '',
    ingred: ''
  };
  const [errors, setErrors] = useState({ ...errorsInitialState });

  const handleOnChange = ({target: {name, value}}) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  return (
    <form autoComplete="off">
      <Grid container style={{ paddingBottom: 15 }}>
        <Grid item xs={6}>
          <Typography className={classes.heading} variant="h5" component="h2" color="secondary">
            NOWY PRZEPIS
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
        <Grid item container xs={3} justify="center" alignItems="flex-start">
          <Typography variant="h6" component="label" htmlFor="receipt-name">
            Nazwa przepisu
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <OutlinedInput
            id="receipt-name"
            className={classes.outlinedInput}
            type="text"
            name="name"
            value={values.name}
            onChange={handleOnChange}
            variant="outlined"
            color="secondary"
            placeholder="Zapiekanka z ziemniakami i brukselką"
            inputProps={{ 'aria-label': 'receipt-name' }}
          />
        </Grid>
      </Grid>
      <Grid container style={{ paddingBottom: 10 }}>
        <Grid item container xs={3} justify="center" alignItems="flex-start">
          <Typography variant="h6" component="label" htmlFor="receipt-description">
            Opis przepisu
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <OutlinedInput
            id="receipt-description"
            className={classes.outlinedInput}
            type="text"
            name="descr"
            value={values.descr}
            onChange={handleOnChange}
            multiline
            rows={3}
            variant="outlined"
            color="secondary"
            placeholder="Mamusina najlepsza zapiekanka pod Słońcem. Można ją podać jako główne danie albo kolację. W zapiekance możesz użyć również kiełbasy paprykowej. Sprawi ona, że zapiekanka będzie ostrzejsza w smaku. Zgodnie z zaleceniami Makłowicza, podawać z dobrze dobranym winkiem ;)"
            inputProps={{ 'aria-label': 'receipt-description' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.dataFormSection}>
        <Grid item xs={6} className={classes.dataFormColumnSection}>
          <Grid item>
            <Typography variant="h6" component="label" htmlFor="receipt-instructions">
              Instrukcje
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ flexBasis: 'unset' }}>
            <Divider />
          </Grid>
          <Grid item className={classes.dataInputSection}>
            <OutlinedInput
              id="receipt-instructions"
              className={classes.outlinedInput}
              type="text"
              multiline
              rows={3}
              variant="outlined"
              color="secondary"
              placeholder="Po tym czasie, ziemniaki zalej śmietaną wymieszaną z 'Knorr Naturalnie smaczne', dodaj liście brukselki i dokładnie wymieszaj."
              inputProps={{ 'aria-label': 'receipt-instructions' }}
            />
            <Button className={classes.addDataButton}>
              <AddBoxIcon />
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.dataList}>
            <ol>
              <ListItem button>
                <li>Lorem</li>
              </ListItem>
              <ListItem button>
                <li>Lorem</li>
              </ListItem>
            </ol>
          </Grid>
        </Grid>
        <Grid item container xs={6} direction="column">
          Składniki
        </Grid>
      </Grid>
    </form>
  );
}
 
export default DesktopAddReceipt;