import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const message = (state, action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
      return {
        id: action.id,
        text: action.text,
        name: action.name,
        timestamp: action.timestamp
      };
    default:
      return state;
  }
};

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.ADD_MESSAGE: {
      const roomId = action.roomId;
      const messageId = action.id;
      const roomsWithMessages = state.data;
      let roomMessages = [];
      if (roomId in roomsWithMessages) {
        roomMessages = roomsWithMessages[roomId].map(value => ({...value}));
        if (roomMessages.map(r => r.id).includes(messageId)) {
          return state;
        }
      }
      roomMessages.push(message(undefined, action));
      let newRoomsWithMessages = JSON.parse(JSON.stringify(roomsWithMessages));
      newRoomsWithMessages[roomId] = roomMessages;
      return Object.assign({}, state, {
        data: {
          ...newRoomsWithMessages
        }
      });
    }
    case types.START_FETCHING_MESSAGES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.MESSAGES_RECEIVED_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        lastFetched: action.receivedAt
      });
    default:
      return state;
  }
}
