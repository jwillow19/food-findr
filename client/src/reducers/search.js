import { SEARCH_CUR, SEARCH_REMOTE } from '../actions/types';

const initialState = {
  isSearching: true, // set this to true when making a search
  coords: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_CUR:
      return {
        ...state,
        coords: payload,
        isSearching: false,
      };
    default:
      return state;
  }
}
