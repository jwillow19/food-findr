import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

const FormLocationSearch = (props) => {
  const [formData, setFormState] = useState({
    newLoc: '',
    radius: '',
  });

  const { newLoc, radius } = formData;

  // udpates location fields to state
  const updateField = (e) => {
    setFormState({
      ...formData,
      // [e.target.name] - computed property names
      [e.target.name]: e.target.value,
    });
  };
  // location - if curLoc exists, use curLoc
  // on submit - run this function: calls the searchRad action to do a google search
  //   const submitForm = (e) => {
  //     e.preventDefault();
  //     searchRad({ location, radius });
  //   };

  return (
    <Fragment>
      <Button variant='contained' color='primary'>
        Primary
      </Button>
    </Fragment>
  );
};

FormLocationSearch.propTypes = {};

export default FormLocationSearch;
