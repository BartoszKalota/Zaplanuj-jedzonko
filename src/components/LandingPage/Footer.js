import React from 'react';
import { Link as LinkScroll } from 'react-scroll';
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
          <LinkScroll
            to="section1"
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
            style={{ marginLeft: 5, cursor: 'pointer' }}
          >
            ZaplanujJedzonko.pl
           </LinkScroll>
        </Typography>
      </Typography>
    </Grid>
    <Grid item xs={false} sm={1} xl={2} />
  </Grid>
);
 
export default Footer;