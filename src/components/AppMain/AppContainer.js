import React, { useState } from 'react';
import {
  Switch,
  Route,
  NavLink,
  Link
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import MenuIcon from '@material-ui/icons/Menu';
import ReceiptIcon from '@material-ui/icons/Receipt';
import TodayIcon from '@material-ui/icons/Today';

import bgImg from '../../assets/bg.png';

import Desktop from './Desktop';
import Receipt from './Receipt';
import Schedule from './Schedule';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  title: {
    width: 255,   // przy domyślnej (mniejszej) szerokości, końcowe 'o' było przycięte 
    padding: '1.3rem 0',
    fontFamily: '"Charmonman", cursive',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center'
  },
  titleColor: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  },
  userSection: {
    fontSize: '1.3rem'
  },
  userAvatar: {
    fontSize: '3rem',
    marginLeft: '1rem'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerPaper: {
    backgroundColor: theme.palette.text.primary
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    marginTop: 8,
    marginBottom: 7,
    ...theme.mixins.toolbar // niezbędne, aby AppBar był na górze
  },
  activeNavButton: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main
  },
  listItem: {
    height: 90,
    padding: theme.spacing(0, 3),
    color: '#FFF',  // zmień na inherit, gdy wstawisz <Link>
    fontSize: '1.3rem'
  },
  listItemChevron: {
    position: 'absolute',
    top: 4,
    left: 115,
    fontSize: '1.5rem'
  },
  main: {
    height: '100vh',
    flexGrow: 1,
    padding: theme.spacing(13.88, 7, 4, 7),
    background: `url(${bgImg}) repeat`
  },
  content: {
    height: '100%',
    padding: theme.spacing(2)
  }
}));

const AppContainer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div style={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid item container xs={12} justify="space-between" alignItems="center">
            <div style={{ display: 'flex' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h1" className={classes.title} noWrap>
                <Link to="/app" style={{ cursor: 'pointer' }}>
                  Zaplanuj <span className={classes.titleColor}>Jedzonko</span>
                </Link>
              </Typography>
            </div>
            <div className={classes.userSection}>
              Imię
              <AccountCircleIcon color="secondary" className={classes.userAvatar} />
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ color: '#FFF' }} />
          </IconButton>
        </div>
        <Divider />
        <List style={{ paddingTop: 0 }}>
          <NavLink
            exact to="/app"
            activeClassName={classes.activeNavButton}
          >
            <ListItem button className={classes.listItem}>
              <ListItemIcon style={{ color: 'inherit' }}>
                <DesktopWindowsIcon />
              </ListItemIcon>
              <span style={{ position: 'relative' }}>
                Pulpit
                <ChevronRightIcon className={classes.listItemChevron} />
              </span>
            </ListItem>
          </NavLink>
          <Divider />
          <NavLink
            to="/app/receipt"
            activeClassName={classes.activeNavButton}
          >
            <ListItem button className={classes.listItem}>
              <ListItemIcon style={{ color: 'inherit' }}>
                <ReceiptIcon />
              </ListItemIcon>
              <span style={{ position: 'relative' }}>
                Przepisy
                <ChevronRightIcon className={classes.listItemChevron} />
              </span>
            </ListItem>
          </NavLink>
          <Divider />
          <NavLink
            to="/app/schedule"
            activeClassName={classes.activeNavButton}
          >
            <ListItem button className={classes.listItem}>
              <ListItemIcon style={{ color: 'inherit' }}>
                <TodayIcon />
              </ListItemIcon>
              <span style={{ position: 'relative' }}>
                Plany
                <ChevronRightIcon className={classes.listItemChevron} />
              </span>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <main className={classes.main}>
        <Paper elevation={10} className={classes.content}>
          <Switch>
            <Route exact path="/app" component={Desktop} />
            <Route path="/app/receipt" component={Receipt} />
            <Route path="/app/schedule" component={Schedule} />
          </Switch>
        </Paper>
      </main>
    </div>
  );
}

export default AppContainer;