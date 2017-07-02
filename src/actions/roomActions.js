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
export const roomMembersReceivedSuccess = () => ({
  type: types.ROOM_MEMBERS_RECEIVED_SUCCESS,
  receivedAt: Date.now()
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
export const addRoomMember = member => ({
  type: types.ADD_ROOM_MEMBER,
  ...member
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
      dispatch(receiveRoomMembersIds(members));
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
export const receiveRoomMembersIds = members => {
  return dispatch => {
    dispatch(roomMembersReceivedSuccess());
    Object.keys(members).forEach(memberId => {
      dispatch(beginAjaxCall());
      firebaseApi
        .GetChildAddedByKeyOnce("/users", memberId)
        .then(user => {
          dispatch(addRoomMember(user.val()));
          dispatch(roomMembersReceivedSuccess());
        })
        .catch(error => {
          dispatch(beginAjaxCall());
          // @TODO better error handling
          throw error;
        });
    });
  };
};

export function loadRoomMemberInfo(memberId) {
  console.log(`loadRoomMemberInfo`);
  return dispatch => {
    console.log(`loadRoomMemberInfo 2`);
    dispatch(beginAjaxCall());
    console.log(`loadRoomMemberInfo`, memberId);
    firebaseApi
      .GetChildAddedByKeyOnce("/users", memberId)
      .then(user => {
        dispatch(addRoomMember(user));
      })
      .catch(error => {
        dispatch(beginAjaxCall());
        // @TODO better error handling
        throw error;
      });
  };
}
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
