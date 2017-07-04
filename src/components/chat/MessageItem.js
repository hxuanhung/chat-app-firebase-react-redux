import React from "react";
import TextInput from "../common/TextInput";
import { Link } from "react-router";
import { Comment } from "semantic-ui-react";
import moment from 'moment';
const timestampToFormattedDate = timestamp => {
  return moment(timestamp).format("DD-MM-YYYY HH:mm:ss");
};
const MessageItem = ({ message }) => {
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author as="a">
          {message.name}
        </Comment.Author>
        <Comment.Metadata>
          <div>
            {timestampToFormattedDate(message.timestamp)}
          </div>
        </Comment.Metadata>
        <Comment.Text>
          {message.text}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
};
MessageItem.propTypes = {
  message: React.PropTypes.object.isRequired
};

export default MessageItem;
