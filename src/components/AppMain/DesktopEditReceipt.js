import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withFirebaseHOC } from '../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Button,
  Grid,
  OutlinedInput,
  Typography
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { IsLoadingContext } from '../../config/contexts/IsLoadingContext';
import { IdClipboard } from '../../config/contexts/IdClipboard';

import * as ROUTES from '../../config/ROUTES';
import AddReceiptInstrList from './elements/AddReceiptInstrList';
import AddReceiptIngredList from './elements/AddReceiptIngredList';

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'left'
  },
  buttonContainer: {
    justifyContent: 'flex-end'
  },
  button: {
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: theme.spacing(2)
  },
  outlinedInput: {
    width: '100%',
    '& > input': {
      padding: theme.spacing(1.5, 2)
    }
  },
  errorMsg: {
    color: theme.palette.error.main
  },
  dataFormSection: {
    paddingTop: 20
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
  dataList: ({ name, descr, instr, ingred }) => {
    let addValue = 0;
    if (name) {
      addValue += 24;
    }
    if (descr) {
      addValue += 24;
    }
    if (instr || ingred) {
      addValue += 24;
    }
    return {
      height: `calc(100vh - ${580 + addValue}px)`,
      minHeight: 70,
      overflow: 'auto',
      '& ol': {
        paddingLeft: 0
      }
    };
  }
}));

const DesktopEditReceipt = ({ firebase }) => {
  const history = useHistory();
  const { setIsLoading } = useContext(IsLoadingContext);
  const { clipboardFirebaseId } = useContext(IdClipboard);
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
  const classes = useStyles(errors);  // przesłanie errors do zarządzania stylem 'dataList'

  // Pobranie danych (z Firebase) do formularza
  useEffect(() => {
    setIsLoading(true);
    const userId = firebase.auth().currentUser.uid;
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('receipts')
      .doc(clipboardFirebaseId)
      .get()
      .then(snapshot => {
        const { name, descr, instr, ingred } = snapshot.data();
        setValues({
          name,
          descr,
          instr,
          ingred
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
        setIsLoading(false);
      });
  }, [firebase, clipboardFirebaseId, setIsLoading]);

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
  const handleOnAddDataToList = ({ currentTarget }) => {
    const input = currentTarget.parentElement.querySelector('textarea');
    if (input.value) {
      let newArr;
      if (input.id === 'receipt-instructions') {
        newArr = [...values.instr, input.value.trim()];
        setValues({
          ...values,
          instr: newArr
        });
        setErrors({
          ...errors,
          instr: ''
        });
      } else {
        newArr = [...values.ingred, input.value.trim()];
        setValues({
          ...values,
          ingred: newArr
        });
        setErrors({
          ...errors,
          ingred: ''
        });
      }
    }
    input.value = '';
  };
  const handleOnEditInstructionsItem = (itemId, itemNewContent) => {
    if (values.instr[itemId] !== itemNewContent) {
      const newArr = [...values.instr];
      newArr[itemId] = itemNewContent;
      setValues({
        ...values,
        instr: newArr
      }); 
    }
  };
  const handleOnEditIngredientsItem = (itemId, itemNewContent) => {
    if (values.ingred[itemId] !== itemNewContent) {
      const newArr = [...values.ingred];
      newArr[itemId] = itemNewContent;
      setValues({
        ...values,
        ingred: newArr
      }); 
    }
  };
  const handleOnCancelInstructionsItemChange = (itemId, originalContent) => {
    const newArr = [...values.instr];
    newArr[itemId] = originalContent;
    setValues({
      ...values,
      instr: newArr
    }); 
  };
  const handleOnCancelIngredientsItemChange = (itemId, originalContent) => {
    const newArr = [...values.ingred];
    newArr[itemId] = originalContent;
    setValues({
      ...values,
      ingred: newArr
    }); 
  };
  const handleOnDeleteInstructionsItem = (itemId) => {
    const itemToDelete = values.instr[itemId];
    setValues(prevState => ({
      ...values,
      instr: prevState.instr.filter(item => item !== itemToDelete)
    }));
  };
  const handleOnDeleteIngredientsItem = (itemId) => {
    const itemToDelete = values.ingred[itemId];
    setValues(prevState => ({
      ...values,
      ingred: prevState.ingred.filter(item => item !== itemToDelete)
    }));
  };
  const validateInputs = () => {
    const errors = {};
    const { name, descr, instr, ingred } = values;
    if (!name) {
      errors.name = 'Brak nazwy przepisu.';
    }
    if (!descr) {
      errors.descr = 'Brak opisu przepisu.';
    }
    if (!instr.length) {
      errors.instr = 'Wprowadź minimum jedną instrukcję do przepisu.';
    }
    if (!ingred.length) {
      errors.ingred = 'Wprowadź minimum jeden składnik.';
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
      const { name, descr, instr, ingred } = values;
      setIsLoading(true);
      const userId = firebase.auth().currentUser.uid;
      firebase.firestore()
        .collection('users')
        .doc(userId)
        .collection('receipts')
        .doc(clipboardFirebaseId)
        .update({ name, descr, instr, ingred })
        .then(() => {
          setValues({ ...valuesInitialState });
          setErrors({ ...errorsInitialState });
          setIsLoading(false);
        })
        .then(() => history.push(ROUTES.RECEIPT))
        .catch(err => {
          console.log(err);
          alert('Błąd połączenia! Zajrzyj do konsoli.');
          setIsLoading(false);
        });
    }
  };
  const handleOnExit = () => history.push(ROUTES.RECEIPT);
  
  return (
    <form autoComplete="off" onSubmit={handleOnSubmit}>
      <Grid container style={{ paddingBottom: 15 }}>
        <Grid item xs={6}>
          <Typography className={classes.heading} variant="h5" component="h2" color="secondary">
            EDYTUJ PRZEPIS
          </Typography>
        </Grid>
        <Grid item container className={classes.buttonContainer} xs={6}>
          <Button className={classes.button} type="submit" variant="contained" color="secondary">
            Zapisz i zamknij
          </Button>
          <Button className={classes.button} onClick={handleOnExit} variant="contained" color="primary">
            Anuluj
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Grid item container xs={12} md={3} justify="center" alignItems="flex-start">
          <Typography variant="h6" component="label" htmlFor="receipt-name" align="center">
            Nazwa przepisu
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <OutlinedInput
            id="receipt-name"
            className={classes.outlinedInput}
            type="text"
            name="name"
            value={values.name}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            variant="outlined"
            color="secondary"
            placeholder="Zapiekanka z ziemniakami i brukselką"
            inputProps={{ 'aria-label': 'receipt-name' }}
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
          <Typography variant="h6" component="label" htmlFor="receipt-description" align="center">
            Opis przepisu
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <OutlinedInput
            id="receipt-description"
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
            placeholder="Mamusina najlepsza zapiekanka pod Słońcem. Można ją podać jako główne danie albo kolację. W zapiekance możesz użyć również kiełbasy paprykowej. Sprawi ona, że zapiekanka będzie ostrzejsza w smaku. Zgodnie z zaleceniami Makłowicza, podawać z dobrze dobranym winkiem ;)"
            inputProps={{ 'aria-label': 'receipt-description' }}
          />
          {errors.descr && (
            <Typography component="p" className={classes.errorMsg}>
              {errors.descr}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.dataFormSection}>
        <Grid item xs={12} md={6}>
          <Grid item>
            <Typography variant="h6" component="label" htmlFor="receipt-instructions">
              Instrukcje
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ flexBasis: 'unset' }}>
            <Divider />
          </Grid>
          <Grid item className={classes.dataInputSection}>
            <div style={{ width: '100%' }}>
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
              {errors.instr && (
                <Typography component="p" className={classes.errorMsg}>
                  {errors.instr}
                </Typography>
              )}
            </div>
            <Button className={classes.addDataButton} onClick={handleOnAddDataToList}>
              <AddBoxIcon />
            </Button>
          </Grid>
          <Grid item className={classes.dataList}>
            <AddReceiptInstrList
              instructionsList={values.instr}
              onEdit={handleOnEditInstructionsItem}
              onCancel={handleOnCancelInstructionsItemChange}
              onDelete={handleOnDeleteInstructionsItem}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6} direction="column">
          <Grid item>
            <Typography variant="h6" component="label" htmlFor="receipt-ingredients">
              Składniki
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ flexBasis: 'unset' }}>
            <Divider />
          </Grid>
          <Grid item className={classes.dataInputSection}>
            <div style={{ width: '100%' }}>
              <OutlinedInput
                id="receipt-ingredients"
                className={classes.outlinedInput}
                type="text"
                multiline
                rows={3}
                variant="outlined"
                color="secondary"
                placeholder="tarty parmezan, 100 g"
                inputProps={{ 'aria-label': 'receipt-ingredients' }}
              />
              {errors.ingred && (
                <Typography component="p" className={classes.errorMsg}>
                  {errors.ingred}
                </Typography>
              )}
            </div>
            <Button className={classes.addDataButton} onClick={handleOnAddDataToList}>
              <AddBoxIcon />
            </Button>
          </Grid>
          <Grid item className={classes.dataList}>
            <AddReceiptIngredList
              ingredientsList={values.ingred}
              onEdit={handleOnEditIngredientsItem}
              onCancel={handleOnCancelIngredientsItemChange}
              onDelete={handleOnDeleteIngredientsItem}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
 
export default withFirebaseHOC(DesktopEditReceipt);