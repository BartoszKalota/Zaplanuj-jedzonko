import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import * as ROUTES from '../../config/ROUTES';
import TileButton from './elements/TileButton';
import AlertInfo from './elements/AlertInfo';
import AlertWarn from './elements/AlertWarn';
import AlertSucc from './elements/AlertSucc';
import TableMain from './elements/TableMain';

const useStyles = makeStyles({
  upperMainGrid: {
    marginBottom: 10
  }
});

const Desktop = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid
          item container
          xs={12} md={7} lg={5}
          wrap="nowrap"
          justify="space-evenly"
          className={classes.upperMainGrid}
        >
          <Link to={ROUTES.RECEIPT}>
            <TileButton btnTitle="dodaj przepis" />
          </Link>
          <Link to={ROUTES.SCHEDULE}>
            <TileButton btnTitle="dodaj plan" />
          </Link>
        </Grid>
        <Grid
          item container
          xs={12} md={5} lg={7}
          className={classes.upperMainGrid}
        >
          <AlertInfo />
          <AlertWarn />
          <AlertSucc />
        </Grid>
      </Grid>
      <Grid container>
        <TableMain />
      </Grid>
    </>
  );
};
 
export default Desktop;