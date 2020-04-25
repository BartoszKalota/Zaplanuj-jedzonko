import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Typography
} from '@material-ui/core';

const Footer = () => (
  <Grid item container xs={12} style={{ backgroundColor: '#383838' }}>
    <Grid item xs={false} sm={1} xl={2} />
    <Grid item container xs={12} sm={10} xl={8} justify="center">
      <Typography component="small" style={{ color: '#FFF', padding: '20px 0' }}>
        Copyright
        <Typography component="span" color="secondary">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 5 }}>
            ZaplanujJedzonko.pl
           </Link>
        </Typography>
      </Typography>
    </Grid>
    <Grid item xs={false} sm={1} xl={2} />
  </Grid>
);
 
export default Footer;