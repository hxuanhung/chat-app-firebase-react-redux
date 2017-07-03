import MemberItem from "./MemberItem";
import React from "react";
import TextInput from "../common/TextInput";
import { Comment } from "semantic-ui-react";
const MemberList = ({ members }) => {
  return (
    <div>
      <h4>List of members</h4>
      <ul>
        {Object.values(members).map((member, i) => <MemberItem key={i} member={member} />)}
      </ul>
    </div>
  );
};

MemberList.propTypes = {
  members: React.PropTypes.object.isRequired
};

export default MemberList;
