import { FILTER_RADIUS, FILTER_RATE } from './types';

// @action  send the filtered values to reducer
export const filterRadius = (radii) => (dispatch) => {
  dispatch({
    type: FILTER_RADIUS,
    payload: radii,
  });
};

export const filterRate = (rate) => (dispatch) => {
  dispatch({
    type: FILTER_RATE,
    payload: rate,
  });
};
