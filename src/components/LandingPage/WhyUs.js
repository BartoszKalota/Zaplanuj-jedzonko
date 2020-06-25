import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles(theme => ({
  whyUsSection: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: '50px 0'
  },
  tile: {
    width: '100%',
    marginBottom: 15,
    [theme.breakpoints.up('md')]: {
      width: '27%',
      marginBottom: 0
    }
  },
  icone: {
    color: theme.palette.text.secondary,
    fontSize: '5.5rem'
  }
}));

const WhyUs = () => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} className={classes.whyUsSection} id="section2">
      <Grid item xs={false} sm={1} xl={2} />
      <Grid item container xs={12} sm={10} xl={8} justify="space-between">
        <Grid item container direction="column" alignItems="center" className={classes.tile}>
          <CheckIcon className={classes.icone} />
          <Typography variant="h5" component="h3" align="center" gutterBottom>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography component="p" align="center" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faubicus arcu condimentum sed.
          </Typography>
        </Grid>
        <Grid item container direction="column" alignItems="center" className={classes.tile}>
          <QueryBuilderIcon className={classes.icone} />
          <Typography variant="h5" component="h3" align="center" gutterBottom>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography component="p" align="center" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faubicus arcu condimentum sed.
          </Typography>
        </Grid>
        <Grid item container direction="column" alignItems="center" className={classes.tile}>
          <FormatListBulletedIcon className={classes.icone} />
          <Typography variant="h5" component="h3" align="center" gutterBottom>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography component="p" align="center" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faubicus arcu condimentum sed.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} xl={2} />
    </Grid>
  );
}

export default WhyUs;