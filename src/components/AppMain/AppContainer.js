import React, { useState, useEffect, useContext } from 'react';
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  Link
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Backdrop,
  CircularProgress,
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import MenuIcon from '@material-ui/icons/Menu';
import ReceiptIcon from '@material-ui/icons/Receipt';
import TodayIcon from '@material-ui/icons/Today';

import IdClipboardProvider from '../../config/contexts/IdClipboard';
import MsgYellowContextProvider from '../../config/contexts/MsgYellowContext';
import { IsLoadingContext } from '../../config/contexts/IsLoadingContext';
import { DesktopSwitcher } from '../../config/contexts/DesktopSwitcher';
import bgImg from '../../assets/bg.png';

import * as ROUTES from '../../config/ROUTES';
import UserInfo from './elements/UserInfo';
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
    alignItems: 'center',
    '& a': {
      color: '#FFF'
    }
  },
  titleColor: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
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
    '& div': {
      color: theme.palette.secondary.main,
      transition: '0.1s',
      '& div': {
        '& span': {
          color: '#FFF',
          fontWeight: 'bold',
          transition: '0.1s'
        }
      }
    }
  },
  listItem: {
    height: 90,
    padding: theme.spacing(0, 3),
    color: '#FFF',
    fontSize: '1.3rem'
  },
  listItemChevron: {
    position: 'absolute',
    top: 4,
    left: 115,
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  main: {
    height: '100vh',
    flexGrow: 1,
    padding: theme.spacing(13.88, 7, 4, 7),
    background: `url(${bgImg}) repeat`
  },
  content: {
    height: '100%',
    overflow: 'auto',
    padding: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#FFF',
  }
}));

const AppContainer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { isLoading } = useContext(IsLoadingContext);
  const { setDesktopMode } = useContext(DesktopSwitcher);

  const handleOnRouteToDesktop = () => setDesktopMode(1);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    document.title = 'Zaplanuj Jedzonko - App';
    return () => setDesktopMode(1); // po wylogowaniu i ponownym zalogowaniu, ustawi się domyślny ekran pulpitu
  }, []);

  return (
    // Brak onLoad={handleOnContentLoaded}, bo zarządzanie załadowaniem odbywa się z poziomu komponentu UserInfo
    // Poza tym, użycie <Route> blokuje tutaj uruchomienie eventu onLoad
    <div style={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid item container xs={12} justify="space-between" alignItems="center">
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
                <Link to={ROUTES.DESKTOP} onClick={handleOnRouteToDesktop} style={{ cursor: 'pointer' }}>
                  Zaplanuj <span className={classes.titleColor}>Jedzonko</span>
                </Link>
              </Typography>
            </div>
            <UserInfo />
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
            exact to={ROUTES.DESKTOP}
            activeClassName={classes.activeNavButton}
            onClick={handleOnRouteToDesktop}
          >
            <ListItem button className={classes.listItem}>
              <ListItemIcon style={{ color: 'inherit' }}>
                <DesktopWindowsIcon />
              </ListItemIcon>
              <div style={{ position: 'relative' }}>
                <span>Pulpit</span>
                <ChevronRightIcon className={classes.listItemChevron} />
              </div>
            </ListItem>
          </NavLink>
          <Divider />
          <NavLink
            to={ROUTES.RECEIPT}
            activeClassName={classes.activeNavButton}
          >
            <ListItem button className={classes.listItem}>
              <ListItemIcon style={{ color: 'inherit' }}>
                <ReceiptIcon />
              </ListItemIcon>
              <div style={{ position: 'relative' }}>
                <span>Przepisy</span>
                <ChevronRightIcon className={classes.listItemChevron} />
              </div>
            </ListItem>
          </NavLink>
          <Divider />
          <NavLink
            to={ROUTES.SCHEDULE}
            activeClassName={classes.activeNavButton}
          >
            <ListItem button className={classes.listItem}>
              <ListItemIcon style={{ color: 'inherit' }}>
                <TodayIcon />
              </ListItemIcon>
              <div style={{ position: 'relative' }}>
                <span>Plany</span>
                <ChevronRightIcon className={classes.listItemChevron} />
              </div>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <main className={classes.main}>
        <Paper elevation={10} className={classes.content}>
          <MsgYellowContextProvider>
            <IdClipboardProvider>
              <Switch>
                <Route exact path={ROUTES.DESKTOP} component={Desktop} />
                <Route path={ROUTES.RECEIPT} component={Receipt} />
                <Route path={ROUTES.SCHEDULE} component={Schedule} />
                <Redirect from="*" to={ROUTES.ERROR} />
              </Switch>
            </IdClipboardProvider>
          </MsgYellowContextProvider>
        </Paper>
      </main>

      {/* Ekran ładowania */}
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </div>
  );
}

export default AppContainer;