import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { withFirebaseHOC } from '../../config/Firebase';
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import clsx from 'clsx';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import * as ROUTES from '../../config/ROUTES';

const useStyles = makeStyles(theme => ({
  userSection: {
    fontSize: '1.3rem',
    textTransform: 'capitalize',
    color: '#FFF'
  },
  userAvatar: {
    fontSize: '3rem',
    marginLeft: '1rem'
  },
  userUploadedAvatar: {
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%'
  }
}));

const StyledMenu = withStyles({   // te style dla menu wzięte z szablonu material-ui
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
  // Bieżący awatar użytkownika pobrany z Firebase
  const USER_FIREBASE_AVATAR = firebase.auth().currentUser?.photoURL; // bez '?' wykrzacza błąd podczas LogOut, że photoURL stanowi null
  const [avatarURL, setAvatarURL] = useState(USER_FIREBASE_AVATAR);

  const handleOnClick = ({ currentTarget }) => setAnchorEl(currentTarget);
  const handleOnClose = () => setAnchorEl(null);
  const handleOnAddAvatar = ({ target }) => {
    setAnchorEl(null);
    // Wysłanie awatara do Firebase
    const file = target.files[0];
    const userId = firebase.auth().currentUser.uid;
    const storage = firebase.storage();
    const uploadTask = storage.ref(`${userId}/profilePicture/${file.name}`).put(file);  // dotąd wystarczy, aby wysłać plik
    uploadTask.on('state_changed',    // postęp wysyłania awatara
      (snapshot) => {
        console.log(snapshot);
      },
      (err) => {
        console.warn('Błąd postępu wysyłania awatara:', err);
      },
      () => {                         // wygenerowanie URLa awatara i zapisanie w state'cie
        storage.ref(`${userId}/profilePicture`).child(file.name).getDownloadURL()
          .then(fileURL => setAvatarURL(fileURL))
          .catch(err => {
            console.warn('Błąd pobierania adresu URL dla wysłanego awatara:', err);
          });
      }
    );
  };
  const handleOnRemoveAvatar = () => {
    setAnchorEl(null);
    const currentUser = firebase.auth().currentUser;
    // Ekstrakcja nazwy pliku awatara z URLa Firebase, żeby później podać właściwą nazwę pliku do usunięcia
    const photoURL = currentUser.photoURL;
    const startSliceIndicator = 'profilePicture%2F';
    const indexStartSlice = photoURL.indexOf(startSliceIndicator) + startSliceIndicator.length;
    const endSliceIndicator = '?alt';
    const indexEndSlice = photoURL.lastIndexOf(endSliceIndicator);
    const avatarFileName = photoURL.slice(indexStartSlice, indexEndSlice);
    //
    const userId = currentUser.uid;
    firebase.storage().ref(`${userId}/profilePicture`).child(avatarFileName).delete()
      .then(() => setAvatarURL(null))
      .catch(err => {
        console.warn('Błąd usunięcia awatara:', err);
      });
  };
  const handleOnLogOut = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        setAnchorEl(null);
        setAvatarURL('')
        history.push(ROUTES.LOGIN);
      })
      .catch(err => {
        console.log(err);
        alert('Błąd wylogowania! Zajrzyj do konsoli.');
        setAnchorEl(null);
      });
  };

  // Aktualizacja awatara w profilu użytkownika na Firebase na podstawie state'a
  useEffect(() => {
    if (firebase.auth().currentUser) {  // bez tego warunku wykrzacza błąd w konsoli po wylogowaniu
      firebase.auth().currentUser.updateProfile({
        photoURL: avatarURL
      });
    }
  }, [avatarURL, firebase]);

  const avatarMenuItem = (
    avatarURL ? (
      // Dodanie labela usuwa domyślne focusowanie na pierwszym przycisku menu
      <label>
        <StyledMenuItem
          onClick={handleOnRemoveAvatar}
        >
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Usuń awatar" />
        </StyledMenuItem>
      </label>
    ) : (
      // W tym przypadku label jest niezbędny (i koniecznie w tym miejscu) dla zapewnienia poprawności działania inputa
      <label style={{ marginBottom: 0 }}>
        <StyledMenuItem>
          <ListItemIcon>
            <FaceIcon fontSize="small" />
          </ListItemIcon>
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleOnAddAvatar}
            multiple={false}
            style={{ display: 'none' }}
          />
          <ListItemText primary="Wstaw awatar" />
        </StyledMenuItem>
      </label>
    )
  );

  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleOnClick}
        className={classes.userSection}
      >
        {/* Bez '?' wykrzacza błąd podczas LogOut, że displayName stanowi null */}
        {firebase.auth().currentUser?.displayName}
        {avatarURL ? (
          <Avatar
            alt="Avatar uploaded by user"
            src={avatarURL}
            className={clsx(classes.userAvatar, classes.userUploadedAvatar)}
          />
        ) : (
          <AccountCircleIcon
            color="secondary"
            id="no-photo-avatar"
            className={classes.userAvatar}
          />
        )}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleOnClose}
      >
        {avatarMenuItem}
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