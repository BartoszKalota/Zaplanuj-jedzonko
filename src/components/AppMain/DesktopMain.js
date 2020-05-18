import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { DesktopSwitcher } from '../../config/contexts/DesktopSwitcher';

import * as ROUTES from '../../config/ROUTES';
import TileButton from './elements/TileButton';
import AlertInfo from './elements/AlertInfo';
import AlertWarn from './elements/AlertWarn';
import AlertSucc from './elements/AlertSucc';
import TableDesktopMain from './elements/TableDesktopMain';

const useStyles = makeStyles({
  upperMainGrid: {
    marginBottom: 10
  }
});

const DesktopMain = () => {
  const classes = useStyles();
  const { setDesktopMode } = useContext(DesktopSwitcher);

  const handleOnRouteToAddReceipt = () => setDesktopMode(2);
  const handleOnRouteToAddSchedule = () => setDesktopMode(3);

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
          <Link to={ROUTES.DESKTOP} onClick={handleOnRouteToAddReceipt}>
            <TileButton btnTitle="dodaj przepis" />
          </Link>
          <Link to={ROUTES.DESKTOP} onClick={handleOnRouteToAddSchedule}>
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
        <TableDesktopMain />
      </Grid>
    </>
  );
}
 
export default DesktopMain;