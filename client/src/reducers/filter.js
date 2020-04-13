import { FILTER_RADIUS, FILTER_RATE, FILTER_TYPE } from '../actions/types';

const initialState = {
  radius: null,
  rate: null,
  searchType: [],
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
    case FILTER_TYPE:
      if (
        state.searchType.some((item) => {
          return payload === item;
        })
      ) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          searchType: [...state.searchType, payload],
        };
      }

    default:
      return {
        ...state,
      };
  }
}
