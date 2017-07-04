import MessageItem from "./MessageItem";
import React from "react";
import TextInput from "../common/TextInput";
import { Comment } from "semantic-ui-react";
const MessageList = ({ messages }) => {
  return (
    <Comment.Group>
      {messages.map((message, i) => <MessageItem key={i} message={message} />)}
    </Comment.Group>
  );
};

MessageList.propTypes = {
  messages: React.PropTypes.array.isRequired
};

export default MessageList;
