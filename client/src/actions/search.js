import { SEARCH_CUR, LOCATION_LOADED, SEARCH_ERR } from '../actions/types';

export const setLocation = () => (dispatch) => {
  const { geolocation } = navigator;

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.');
        break;
      default:
        alert('An unknown error occurred.');
    }
  };

  // convert HTML5 geoposition object -> regular object first
  const geopositionToObject = (geoposition) => ({
    timestamp: geoposition.timestamp,
    coords: {
      accuracy: geoposition.coords.accuracy,
      latitude: geoposition.coords.latitude,
      longitude: geoposition.coords.longitude,
    },
  });

  geolocation.getCurrentPosition((position) => {
    // console.log(position);
    const posObj = geopositionToObject(position);
    // console.log(posObj);
    dispatch({
      type: SEARCH_CUR,
      payload: posObj.coords,
    });
  }, showError);
};

// @action  loadLocation - retrieve location from localStorage - if any, dispatch and load to store
// @goal    persist state, prevent crash when reload

export const loadLocation = () => (dispatch) => {
  if (localStorage.location) {
    const location = JSON.parse(localStorage.location);
    dispatch({
      type: LOCATION_LOADED,
      payload: location,
    });
  } else {
    dispatch({
      type: SEARCH_ERR,
    });
  }
};
