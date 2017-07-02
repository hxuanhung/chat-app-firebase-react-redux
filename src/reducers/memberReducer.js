import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const room = (state, action) => {
  switch (action.type) {
    case types.ADD_ROOM_MEMBER:
      return {
        email: action.email,
        id: action.uid
      };
    default:
      return state;
  }
};

export default function memberReducer(state = initialState.rooms, action) {
  switch (action.type) {
    case types.ADD_ROOM_MEMBER:
      console.log(state, action);
      if (state.data.map(r => r.email).includes(action.email)) {
        return state;
      } else {
        let data = state.data.map(member => ({ ...member }));
        data.push(room(undefined, action));
        return {
          ...state,
          data
        };
      }
    case types.START_FETCHING_ROOMS_MEMBERS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.ROOM_MEMBERS_RECEIVED_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        lastFetched: action.receivedAt
      });
    default:
      return state;
  }
}
