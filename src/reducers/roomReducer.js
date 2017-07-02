import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const room = (state, action) => {
  switch (action.type) {
    case types.ADD_ROOM:
      return {
        id: action.id,
        title: action.title,
        timestamp: action.timestamp
      };
    default:
      return state;
  }
};

export default function roomReducer(state = initialState.rooms, action) {
  switch (action.type) {
    case types.ADD_ROOM:
      if (state.data.map(r => r.id).includes(action.id)) {
        return state;
      } else {
        let data = [...state.data];
        data.push(room(undefined, action));
        return {
          ...state,
          data
        };
      }
    case types.START_FETCHING_ROOMS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.ROOMS_RECEIVED_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        lastFetched: action.receivedAt
      });
    default:
      return state;
  }
}
