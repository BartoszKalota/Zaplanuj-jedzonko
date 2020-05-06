import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { withFirebaseHOC } from '../../config/Firebase';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import * as ROUTES from '../../config/ROUTES';

const useStyles = makeStyles({
  userSection: {
    fontSize: '1.3rem',
    textTransform: 'capitalize',
    color: '#FFF'
  },
  userAvatar: {
    fontSize: '3rem',
    marginLeft: '1rem'
  }
});

const StyledMenu = withStyles({   // wzięte z szablonu material-ui
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const UserInfo = ({ firebase }) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOnClick = ({ currentTarget }) => setAnchorEl(currentTarget);
  const handleOnClose = () => setAnchorEl(null);
  const handleOnLogOut = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        console.log('Użytkownik wylogowany');
        setAnchorEl(null);
        history.push(ROUTES.LOGIN);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd wylogowania! Zajrzyj do konsoli.');
        setAnchorEl(null);
      });
  };
  
  const userName = firebase.auth().currentUser?.displayName;  // bez '?' wykrzacza błąd podczas LogOut, że displayName is null

  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleOnClick}
        className={classes.userSection}
      >
        {userName}
        <AccountCircleIcon color="secondary" className={classes.userAvatar} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleOnClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          {/* Później będzie możliwość wstawienia własnego awatara */}
          <ListItemText primary="Sent mail" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={handleOnLogOut}
        >
          <ListItemIcon>
            <MeetingRoomIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Wyloguj" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}
 
export default withFirebaseHOC(UserInfo);