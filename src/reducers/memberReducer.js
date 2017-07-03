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
    case types.ADD_ROOM_MEMBER: {
      console.log(state, action);
      const roomId = action.roomId;
      const memberId = action.uid;
      const roomMembers = roomId in state.data ? { ...state.data[roomId] } : {};
      let roomsWithMembers = { ...state.data };
      if (memberId in roomMembers) {
        return state;
      }
      roomMembers[memberId] = room(undefined, action);
      roomsWithMembers[roomId] = { ...roomMembers };
      return {
        ...state,
        data: {
          ...roomsWithMembers
        }
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
