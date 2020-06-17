import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Grid,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import { NewsletterContext } from '../../config/contexts/NewsletterContext';

const useStyles = makeStyles(theme => ({
  newsletterSection: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    padding: '40px 0'
  },
  textSection: {
    textAlign: 'center',
    marginBottom: 30,
    paddingRight: 0,
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      marginBottom: 0,
      paddingRight: 30
    }
  },
  formSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end'
    }
  },
  form: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width:690px)': {
      flexDirection: 'column'
    },
    [theme.breakpoints.up('md')]: {
      width: 'unset'
    }
  },
  input: {
    width: '60%',
    minWidth: 223,
    maxHeight: 56,
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginRight: 2,
    '@media (max-width:690px)': {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 'unset'
    }
  },
  btn: {
    width: '40%',
    color: theme.palette.background.paper,
    padding: '14px 30px',
    fontSize: '1rem',
    '@media (max-width:690px)': {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 'unset'
    }
  }
}));

const Newsletter = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const { isSubmitted, isPending, sendToFirebase } = useContext(NewsletterContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    inputValue && sendToFirebase(inputValue);
    setInputValue('');
  };
  const handleOnChange = ({target: {value}}) => setInputValue(value);

  return (
    <Grid item container xs={12} className={classes.newsletterSection}>
      <Grid item xs={false} sm={1} xl={2} />
      <Grid item container xs={12} sm={10} xl={8}>
        <Grid item container xs={12} md={7} alignItems="center" className={classes.textSection}>
          <Typography variant="h4" component="h4" style={{width: '100%'}}>
            Zapisz się do naszego newslettera
          </Typography>
        </Grid>
        <Grid item container xs={12} md={5} className={classes.formSection}>
          <form onSubmit={handleOnSubmit} className={classes.form}>
            <TextField
              id="filled-secondary"
              label="Adres email"
              variant="filled"
              color="secondary"
              type="email"
              value={inputValue}
              onChange={handleOnChange}
              disabled={isSubmitted}
              className={classes.input}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isPending || isSubmitted}
              className={classes.btn}
              style={{ position: 'relative' }}
            >
              <Typography style={{fontWeight: 'bold'}} noWrap>
                {isSubmitted ? 'Wysłano' : 'Zapisuję się!'}
              </Typography>
              {isPending && <CircularProgress color="secondary" style={{ position: 'absolute' }} />}
            </Button>
          </form>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} xl={2} />
    </Grid>
  );
}

export default Newsletter;