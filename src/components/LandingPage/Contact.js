import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles(theme => ({
  contactSection: {
    backgroundColor: '#4a4a49',
    color: '#FFFFFA',
    padding: '40px 0'
  },
  column: {
    width: '100%',
    marginBottom: 30,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      width: '27%',
      marginBottom: 0,
      textAlign: 'left'
    }
  },
  header: {
    fontWeight: 'bold'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginRight: 2
  },
  btn: {
    minWidth: 109,
    color: '#FFFFFA',
    padding: '14px 15px',
  },
  icon: {
    fontSize: '2.5rem',
    color: '#FFF',
    '&:hover': {
      color: '#FF6600',
      transition: '0.3s'
    }
  }
}));

const Contact = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);  // tymczasowo
    setInputValue('');
  };
  const handleOnChange = ({target: {value}}) => setInputValue(value);

  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Grid item container xs={12} className={classes.contactSection} id="section4">
      <Grid item xs={false} sm={1} xl={2} />
      <Grid item container xs={12} sm={10} xl={8} justify="space-between">
        <Grid item container direction="column" className={classes.column}>
          <Typography variant="h5" component="h6" className={classes.header} gutterBottom>
            Lorem ipsum dolor
          </Typography>
          <Typography component="p" align="left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.
          </Typography>
        </Grid>
        <Grid item container direction="column" className={classes.column}>
          <Typography variant="h5" component="h6" className={classes.header} gutterBottom>
            Lorem ipsum dolor
          </Typography>
          <Typography component="p" paragraph>
            {bull} consectetur adipiscing elit
          </Typography>
          <Typography component="p" paragraph>
            {bull} sed do eiusmod tempor
          </Typography>
          <Typography component="p" paragraph>
            {bull} incididunt ut labore
          </Typography>
          <Typography component="p" paragraph>
            {bull} et dolore magna aliqua
          </Typography>
        </Grid>
        <Grid item container direction="column" className={classes.column}>
          <Typography variant="h5" component="h6" className={classes.header} style={{ marginBottom: 20 }} >
            Zapisz się do naszego newslettera
          </Typography>
          <form onSubmit={handleOnSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="filled-secondary"
              label="Adres email"
              variant="filled"
              color="secondary"
              type="email"
              size="small"
              value={inputValue}
              onChange={handleOnChange}
              className={classes.input}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.btn}
            >
              <Typography style={{ fontWeight: 'bold', fontSize: '0.8rem' }} noWrap>
                Zapisuję się!
              </Typography>
            </Button>
          </form>
          <div style={{ marginTop: 20 }}>
            <a href="https://pl-pl.facebook.com/">
              <FacebookIcon className={classes.icon} />
            </a>
            <a href="https://twitter.com/explore">
              <TwitterIcon className={classes.icon} style={{ margin: '0 45px' }} />
            </a>
            <a href="https://www.instagram.com/">
              <InstagramIcon className={classes.icon} />
            </a>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} xl={2} />
    </Grid>
  );
}
 
export default Contact;