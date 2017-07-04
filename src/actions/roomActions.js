import { ajaxCallError, beginAjaxCall } from "./ajaxStatusActions";
import firebaseApi from "../api/firebase";
import * as types from "./actionTypes";
import { push } from "react-router-redux";
export function createRoom(name) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return firebaseApi
      .createRoom(name)
      .then(room => {
        dispatch(roomCreatedSuccess(room));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw error;
      });
  };
}

export const roomsReceivedSuccess = () => ({
  type: types.ROOMS_RECEIVED_SUCCESS,
  receivedAt: Date.now()
});
export const roomMemberInfoLoadedSuccess = () => ({
  type: types.ROOM_MEMBER_INFO_LOADED_SUCCESS
});
export const roomMemberReceivedSuccess = () => ({
  type: types.ROOM_MEMBERS_RECEIVED_SUCCESS,
  receivedAt: Date.now()
});
export const roomMembersIdsReceivedSuccess = () => ({
  type: types.ROOM_MEMBERS_IDS_RECEIVED_SUCCESS
});
export const startFetchingRoom = () => ({
  type: types.START_FETCHING_ROOMS
});
export const startFetchingRoomMembers = () => ({
  type: types.START_FETCHING_ROOMS_MEMBERS
});

export const addRoom = room => ({
  type: types.ADD_ROOM,
  ...room
});
export const addRoomMember = (member, roomId) => ({
  type: types.ADD_ROOM_MEMBER,
  ...member,
  roomId
});

export const fetchRooms = () => {
  return dispatch => {
    dispatch(beginAjaxCall());
    dispatch(startFetchingRoom());
    return firebaseApi.fetchRooms().on("value", snapshot => {
      const rooms = snapshot.val() || [];
      dispatch(receiveRooms(rooms));
    });
  };
};
export const fetchRoomMembers = roomId => {
  console.log(`fetch rooms members`);
  return dispatch => {
    dispatch(beginAjaxCall());
    dispatch(startFetchingRoomMembers());
    firebaseApi.fetchRoomMembers(roomId).on("value", snapshot => {
      const members = snapshot.val() || [];
      console.log(members);
      dispatch(receiveRoomMembersIds(members, roomId));
    });
  };
};

export const receiveRooms = rooms => {
  return dispatch => {
    Object.values(rooms).forEach(room => {
      return dispatch(addRoom(room));
    });

    dispatch(roomsReceivedSuccess());
  };
};
export const receiveRoomMembersIds = (members, roomId) => {
  return dispatch => {
    dispatch(roomMembersIdsReceivedSuccess());
    Object.keys(members).forEach(memberId => {
      console.log(`receiveRoomMembersIds`, memberId);
      dispatch(beginAjaxCall());
      firebaseApi
        .GetChildAddedByKeyOnce("/users", memberId)
        .then(user => {
          dispatch(addRoomMember(user.val(), roomId));
          dispatch(roomMemberReceivedSuccess());
        })
        .catch(error => {
          dispatch(ajaxCallError(error));
          // @TODO better error handling
          throw error;
        });
    });
  };
};

export function joinRoom(roomId, user) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return firebaseApi
      .joinRoom(roomId, user)
      .then(() => {
        dispatch(roomJointSuccess());
        dispatch(push(`/chats/room/${roomId}`));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw error;
      });
  };
}
export function leaveRoom(roomId, user) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return firebaseApi
      .leaveRoom(roomId, user)
      .then(() => {
        dispatch(leaveRoomSuccess());
        dispatch(push("/chats"));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw error;
      });
  };
}
export function roomCreatedSuccess() {
  return {
    type: types.ROOM_CREATED_SUCCESS
  };
}
export function roomJointSuccess() {
  return {
    type: types.ROOM_JOINT_SUCCESS
  };
}
export function leaveRoomSuccess() {
  return {
    type: types.ROOM_LEAVE_SUCCESS
  };
}
