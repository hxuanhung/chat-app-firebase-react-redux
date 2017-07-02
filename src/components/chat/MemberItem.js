import React from "react";
import TextInput from "../common/TextInput";
import { Link } from "react-router";
import { Comment } from "semantic-ui-react";
import moment from 'moment';
const timestampToFormattedDate = timestamp => {
  return moment(timestamp).format("DD-MM-YYYY HH:mm:ss");
};
const MemberItem = ({ member }) => {
  return (
    <li>{member.email}</li>
  );
};
MemberItem.propTypes = {
  member: React.PropTypes.object.isRequired
};

export default MemberItem;
