import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// import { mainListItems } from './listItems.js';
import FilterList from './FilterList';
import RenderMap from './RenderMap';

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Map = ({ filter, search }) => {
  const { radius, rate } = filter;
  const { coords } = search;
  const curLocation = { lat: coords.latitude, lng: coords.longitude };

  // material ui states
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const api_key = process.env.REACT_APP_API_KEY;
  // const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${api_key}`;

  // append google api script to body
  // [*Note] Doing this will make google a window object
  // function appendScript() {
  //   const script = document.createElement('script');
  //   const api_key = process.env.REACT_APP_API_KEY;
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&callback=initializeMap`;
  //   script.async = true;
  //   script.defer = true;
  //   script.id = 'google-script';
  //   document.body.appendChild(script);
  // }

  // DOM update - append api script to body & create window method after render
  // useEffect(() => {
  //   appendScript();

  //   // callback=initialize from script src is looking for a function in window
  //   // word aroound -> create a window method ("global function")
  //   window.initializeMap = () => {
  //     var latlng = new window.google.maps.LatLng(
  //       coords.latitude,
  //       coords.longitude
  //     );
  //     var myOptions = {
  //       zoom: 5,
  //       center: latlng,
  //       mapTypeId: window.google.maps.MapTypeId.ROADMAP,
  //     };
  //     var map = new window.google.maps.Map(
  //       document.getElementById('map'),
  //       myOptions
  //     );
  //     var marker = new window.google.maps.Marker({
  //       position: latlng,
  //       map,
  //       animation: window.google.maps.Animation.BOUNCE,
  //     });
  //     marker.setMap(map);
  //   };
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        {/* App bar */}
        <AppBar
          position='absolute'
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              Findr
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Filter Drawer - building in FilterList */}
        <Drawer
          variant='permanent'
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />
          {/* Change mainListItems to a menu component */}
          {/* <List>{mainListItems}</List>*/}

          <FilterList />
        </Drawer>

        {/* Map display here */}
        <main className={classes.content}>
          <RenderMap />
        </main>
      </div>
    </ThemeProvider>
  );
};

Map.propTypes = {
  filter: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.filter,
  search: state.search,
});

export default connect(mapStateToProps)(Map);
