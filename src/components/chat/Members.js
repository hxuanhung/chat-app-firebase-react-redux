import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { fetchRoomMembers } from "../../actions/roomActions";
import MemberList from "../../components/chat/MemberList";
import toastr from "toastr";
import { bindActionCreators } from "redux";
export class Members extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isFetching: props.isFetching,
      members: props.members,
      roomId: props.roomId
    };
  }

  componentWillMount() {
    this.props.actions.fetchRoomMembers(this.props.roomId);
  }
  render() {
    if (this.props.isFetching) {
      return <h1>Fetching data</h1>;
    } else {
      return (
        <MemberList
          members={this.props.members.data[this.props.roomId] || {}}
        />
      );
    }
  }
}

Members.propTypes = {
  actions: PropTypes.object.isRequired
};

Members.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const pathname = state.routing.locationBeforeTransitions.pathname;
  return {
    members: state.members,
    isFetching: state.members.isFetching,
    roomId: pathname.substring(pathname.lastIndexOf(`/`) + 1, pathname.len)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchRoomMembers }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Members);
