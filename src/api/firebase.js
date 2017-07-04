import * as firebase from "firebase/firebase-browser";
import { firebaseConfig } from "../config";

class FirebaseApi {
  static initAuth() {
    firebase.initializeApp(firebaseConfig);
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static sendMessage(text, user, roomId) {
    return new Promise((resolve, reject) => {
      let msg = {
        text: text,
        timestamp: Date.now(),
        name: user.email
      };
      const newMsgRef = firebase
        .database()
        .ref("messages/" + roomId + "/")
        .push();
      msg.id = newMsgRef.key;
      newMsgRef.set(msg);
      resolve(msg);
    });
  }

  static createRoom(name) {
    return new Promise((resolve, reject) => {
      let room = {
        title: name,
        timestamp: Date.now()
      };
      const newRoomRef = firebase.database().ref("chats").push();
      room.id = newRoomRef.key;
      newRoomRef.set(room);
      resolve(room);
    });
  }
  static joinRoom(roomId, user) {
    let updates = {};
    updates["users/" + user.uid + "/rooms/" + roomId] = true;
    updates["members/" + roomId + "/" + user.uid] = true;
    return firebase.database().ref().update(updates);
  }
  static leaveRoom(roomId, user) {
    let updates = {};
    updates["users/" + user.uid + "/rooms/" + roomId] = null;
    updates["members/" + roomId + "/" + user.uid] = null;
    return firebase.database().ref().update(updates);
  }

  static fetchRooms() {
    return firebase
        .database()
        .ref("chats")
        .orderByKey();
  }
  static fetchRoomMembers(roomId) {
    return firebase
        .database()
        .ref("members/" + roomId)
        .orderByKey();
  }
  static fetchMessages(roomId) {
    return firebase
        .database()
        .ref("messages/" + roomId)
        .orderByKey()
        .limitToLast(10);
  }
  static createUserWithEmailAndPassword(user) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(user) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
  }

  static authSignOut() {
    return firebase.auth().signOut();
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(path).push(value, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  static GetValueByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once("value");
  }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once("child_added");
  }

  static databaseSet(path, value) {
    return firebase.database().ref(path).set(value);
  }
}

export default FirebaseApi;
