import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { joinRoom } from "../../actions/roomActions";
import toastr from "toastr";
import { Card } from "semantic-ui-react";
import moment from "moment";
const timestampToFormattedDate = timestamp => {
  return moment(timestamp).format("DD-MM-YYYY HH:mm:ss");
};
export class RoomItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: props.user,
      room: props.room
    };
    this.onJoin = this.onJoin.bind(this);
    this.checkIsJoint = this.checkIsJoint.bind(this);
  }

  onJoin() {
    this.props.actions
      .joinRoom(this.props.room.id, this.props.user)
      .then(() => {
        toastr.success("Welcome");
      })
      .catch(error => {
        toastr.error(error.message);
      });
  }

  checkIsJoint() {
    return this.props.room.id in this.props.user.rooms ? true : false;
  }
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {this.props.room.title}
          </Card.Header>
          <Card.Meta>
            Created at: {timestampToFormattedDate(this.props.room.timestamp)}
          </Card.Meta>
        </Card.Content>
        <input
          type="button"
          value= "Join"
          className="btn btn-primary"
          onClick={this.onJoin}
        />
      </Card>
    );
  }
}

RoomItem.propTypes = {
  actions: PropTypes.object.isRequired,
  room: React.PropTypes.object.isRequired
};

RoomItem.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ joinRoom }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomItem);
