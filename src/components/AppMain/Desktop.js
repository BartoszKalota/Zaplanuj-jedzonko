import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Typography
} from '@material-ui/core';

import * as ROUTES from '../../config/ROUTES';
import TileButton from './elements/TileButton';

const Desktop = () => (
  <>
    <Grid container>
      <Grid item container xs={12} md={5} wrap="nowrap" justify="space-evenly">
        <Link to={ROUTES.RECEIPT}>
          <TileButton btnTitle="dodaj przepis" />
        </Link>
        <Link to={ROUTES.SCHEDULE}>
          <TileButton btnTitle="dodaj plan" />
        </Link>
      </Grid>
      <Grid item container xs={12} md={7}>alert</Grid>
    </Grid>
    <Grid container style={{ marginTop: 20 }}>
      <Typography variant="h3" component="h1">Desktop</Typography>
    </Grid>
  </>
);
 
export default Desktop;