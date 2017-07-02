import { ajaxCallError, beginAjaxCall } from "./ajaxStatusActions";
import firebaseApi from "../api/firebase";
import * as types from "./actionTypes";

export function sendMessage(text, user, roomId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return firebaseApi
      .sendMessage(text, user, roomId)
      .then(message => {
        dispatch(messageSentSuccess(message));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw error;
      });
  };
}

export function messageSentSuccess() {
  return {
    type: types.MESSAGE_SENT_SUCCESS
  };
}

export const messagesReceivedSuccess = () => ({
  type: types.MESSAGES_RECEIVED_SUCCESS,
  receivedAt: Date.now()
});

export const addMessage = (message, roomId) => ({
  type: types.ADD_MESSAGE,
  roomId,
  ...message
});
export const startFetchingMessages = () => ({
  type: types.START_FETCHING_MESSAGES
});
export const fetchMessages = roomId => {
  return dispatch => {
    dispatch(beginAjaxCall());
    dispatch(startFetchingMessages());

    firebaseApi.fetchMessages(roomId).on(`value`, snapshot => {
      const messages = snapshot.val() || [];
      dispatch(receiveMessages(messages, roomId));
    });
  };
};

export const receiveMessages = (messages, roomId) => {
  return dispatch => {
    Object.values(messages).forEach(message => {
      return dispatch(addMessage(message, roomId));
    });

    dispatch(messagesReceivedSuccess());
  };
};
