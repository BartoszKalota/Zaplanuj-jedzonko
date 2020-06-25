import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles(theme => ({
  tileButton: {
    width: 160,
    height: 160,
    marginRight: 20,
    textTransform: 'lowercase',
    border: `2px solid ${theme.palette.success.main}`,
    '&:hover': {
      backgroundColor: theme.palette.tileButtonBgrColor
    },
    '& span': {
      flexDirection: 'column'
    }
  },
  icon: {
    fontSize: '4rem',
    color: theme.palette.success.main
  },
  text: {
    fontWeight: 'bold',
    color: theme.palette.success.main
  }
}));

const TileButton = ({ btnTitle }) => {
  const classes = useStyles();
  return (
    <Button className={classes.tileButton} variant="outlined">
      <AddBoxIcon className={classes.icon} fontSize="large" />
      <Typography className={classes.text} variant="body1" component="span">
        {btnTitle}
      </Typography>
    </Button>
  );
}
 
export default TileButton;