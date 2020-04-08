import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Dark mode
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  button: {
    color: 'white',
  },
}));

export default function Navbar() {
  const classes = useStyles(darkTheme);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <AppBar position='static' color='inherit'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Food Findr
            </Typography>
            <Button className={classes.button}>Search</Button>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
