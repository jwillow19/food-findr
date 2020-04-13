import {
  SEARCH_CUR,
  SEARCH_REMOTE,
  LOCATION_LOADED,
  SEARCH_ERR,
} from '../actions/types';

const initialState = {
  isSearching: true, // set this to true when making a search
  coords: JSON.parse(localStorage.getItem('location')),
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_CUR:
    case SEARCH_REMOTE:
      // set location to localStorage - stringify object before storage
      localStorage.setItem('location', JSON.stringify(payload));
      return {
        ...state,
        coords: payload,
        isSearching: false,
      };
    case LOCATION_LOADED:
      return {
        ...state,
        coords: payload,
        isSearching: false,
      };
    case SEARCH_ERR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
