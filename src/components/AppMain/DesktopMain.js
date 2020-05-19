import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { withFirebaseHOC } from '../../config/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { MsgYellowContext } from '../../config/contexts/MsgYellowContext';
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

const DesktopMain = ({ firebase }) => {
  const classes = useStyles();
  const [receiptsNum, setReceiptsNum] = useState('');
  const { schedulesNum } = useContext(MsgYellowContext);
  const { setDesktopMode } = useContext(DesktopSwitcher);

  const handleOnRouteToAddReceipt = () => setDesktopMode(2);
  const handleOnRouteToAddSchedule = () => setDesktopMode(3);

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('receipts')
      .get()
      .then(snapshot => {
        const array = [];
        snapshot.docs.forEach(doc => {
          array.push(doc.data());
        });
        console.log(array);
        setReceiptsNum(array.length);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd połączenia! Zajrzyj do konsoli.');
      });
  }, [firebase]);

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
          <AlertInfo receiptsNum={receiptsNum} />
          {schedulesNum === 0 && <AlertWarn />}
          <AlertSucc />
        </Grid>
      </Grid>
      <Grid container>
        <TableDesktopMain />
      </Grid>
    </>
  );
}
 
export default withFirebaseHOC(DesktopMain);