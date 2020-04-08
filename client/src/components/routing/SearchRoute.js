import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const SearchRoute = ({ component: Component, search, ...rest }) => {
  const { isSearching } = search;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isSearching ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};

SearchRoute.propTypes = {
  search: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  search: state.search,
});
export default connect(mapState)(SearchRoute);
