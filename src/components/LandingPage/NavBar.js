import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
  navBar: {
    minHeight: 75,
    '@media (min-width:1252px)': {
      minHeight: 90
    }
  },
  title: {
    width: 255,   // przy domyślnej (mniejszej) szerokości, końcowe 'o' było przycięte 
    fontFamily: '"Charmonman", cursive',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width:1252px)': {
      width: 320,   // przy domyślnej (mniejszej) szerokości, końcowe 'o' było przycięte
      fontSize: '2.5rem'
    }
  },
  titleColor: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      color: 'inherit'
    },
  },
  desktopBtn: {
    fontSize: '0.86rem',
    marginLeft: 15,
    '&:hover': {
      color: theme.palette.secondary.main
    },
    '@media (min-width:1050px)': {
      fontSize: '0.9rem',
      marginLeft: 30
    },
    '@media (min-width:1252px)': {
      fontSize: '1.05rem',
      marginLeft: 40
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-menu';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link 
          to="/app"
          style={{ width: '100%' }}
        >
          <Button color="inherit" fullWidth>
            ZAPLANUJ POSIŁKI!
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        <LinkScroll
          to="section2"
          spy={true}
          smooth={true}
          offset={-75}
          duration={500}
          style={{ width: '100%' }}
        >
          <Button color="inherit" fullWidth>
            DLACZEGO WARTO?
          </Button>
        </LinkScroll>
      </MenuItem>
      <MenuItem>
        <LinkScroll
          to="section3"
          spy={true}
          smooth={true}
          offset={-75}
          duration={500}
          style={{ width: '100%' }}
        >
          <Button color="inherit" fullWidth>
            O MNIE
          </Button>
        </LinkScroll>
      </MenuItem>
      <MenuItem>
        <LinkScroll
          to="section4"
          spy={true}
          smooth={true}
          offset={-75}
          duration={500}
          style={{ width: '100%' }}
        >
          <Button color="inherit" fullWidth>
            KONTAKT
          </Button>
        </LinkScroll>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar>
        <Toolbar>
          <Grid item container xs={12} className={classes.navBar}>
            <Grid item xs={false} sm={1} xl={2} />
            <Grid item container xs={12} sm={10} xl={8} justify="space-between" alignItems="stretch">
              <Typography variant="h1" className={classes.title} noWrap>
                <LinkScroll
                  to="section1"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  style={{ cursor: 'pointer' }}
                >
                  Zaplanuj <span className={classes.titleColor}>Jedzonko</span>
                </LinkScroll>
              </Typography>
              <div className={classes.sectionDesktop}>
                <Link
                  to="/app"
                  style={{ display: 'flex' }}
                >
                  <Button color="inherit" className={classes.desktopBtn}>
                    ZAPLANUJ POSIŁKI!
                  </Button>
                </Link>
                <LinkScroll
                  to="section2"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  style={{ display: 'flex' }}
                >
                  <Button color="inherit" className={classes.desktopBtn}>
                    DLACZEGO WARTO?
                  </Button>
                </LinkScroll>
                <LinkScroll
                  to="section3"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  style={{ display: 'flex' }}
                >
                  <Button color="inherit" className={classes.desktopBtn}>
                    O MNIE
                  </Button>
                </LinkScroll>
                <LinkScroll
                  to="section4"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  style={{ display: 'flex' }}
                >
                  <Button color="inherit" className={classes.desktopBtn}>
                    KONTAKT
                  </Button>
                </LinkScroll>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item xs={false} sm={1} xl={2} />
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default NavBar;