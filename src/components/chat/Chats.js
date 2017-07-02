import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createRoom } from "../../actions/roomActions";
import CreateRoomForm from "./CreateRoomForm";
import Rooms from "./Rooms";
import toastr from "toastr";
import checkAuth from "../requireAuth";
export class Chats extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      creating: false,
      rooms: props.rooms,
      auth: props.auth
    };

    this.updateRoomNameState = this.updateRoomNameState.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  updateRoomNameState(event) {
    const field = event.target.room;
    let name = event.target.value;
    return this.setState({ name });
  }

  createRoom(event) {
    event.preventDefault();

    this.setState({ creating: true });

    this.props.actions
      .createRoom(this.state.name)
      .then(() => {
        toastr.success("Room Created");
        this.setState({ creating: false, name: "" });
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({ creating: false });
      });
  }

  render() {
    if (this.props.auth.isLogged) {
      return (
        <div>
          <CreateRoomForm
            onChange={this.updateRoomNameState}
            onCreate={this.createRoom}
            creating={this.state.creating}
            name={this.state.name}
          />
            <Rooms history={this.props.history} />
        </div>
      );
    } else {
      return <h1>You need to be logged in</h1>;
    }
  }
}

Chats.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

Chats.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return { rooms: state.rooms, auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ createRoom }, dispatch)
  };
}

export default checkAuth(connect(mapStateToProps, mapDispatchToProps)(Chats));
