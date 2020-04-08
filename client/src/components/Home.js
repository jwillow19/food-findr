import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { setLocation } from '../actions/search';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'theme.palette.secondary.main,',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

const Home = ({ setLocation, search }) => {
  const { isSearching } = search;

  const onClick = async (e) => {
    e.preventDefault();
    setLocation();
  };

  const classes = useStyles(theme);

  if (!isSearching) {
    return <Redirect to='/map' />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {'Decide on where to eat made easy'}
          </Typography>
          <form className={classes.form} noValidate>
            <Button
              onClick={(e) => onClick(e)}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {'Search current location'}
            </Button>

            <Button
              type='submit'
              href='/remote'
              fullWidth
              variant='contained'
              className={classes.submit}
            >
              {'Remote Search'}
            </Button>

            {/* {!isSearching ? (
            //   <div>
            //     <p>lat: {coords.latitude}</p>
            //     <p>long: {coords.longitude}</p>
            //   </div>
            // ) : (
            //   <p>nothing</p>
            // )}*/}

            <Grid container>
              <Grid item>
                <Link to='/signup'>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

Home.propTypes = {
  search: PropTypes.object.isRequired,
  setLocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

export default connect(mapStateToProps, { setLocation })(Home);
