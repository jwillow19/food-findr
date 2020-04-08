import { SEARCH_CUR, SEARCH_REMOTE } from '../actions/types';

export const setLocation = () => async (dispatch) => {
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
    console.log(position);
    const posObj = geopositionToObject(position);
    console.log(posObj);
    dispatch({
      type: SEARCH_CUR,
      payload: posObj.coords,
    });
  }, showError);
};
