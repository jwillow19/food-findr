import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Map from './components/dashboard/Map';
import Alert from './components/Alert';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Home} />

          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/map' component={Map} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
