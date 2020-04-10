import { FILTER_RADIUS, FILTER_RATE } from '../actions/types';

const initialState = {
  radius: null,
  rate: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FILTER_RADIUS:
      return {
        ...state,
        radius: payload,
      };
    case FILTER_RATE:
      return {
        ...state,
        rate: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
