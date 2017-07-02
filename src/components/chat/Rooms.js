import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { fetchRooms } from "../../actions/roomActions";
import RoomList from "./RoomList";
import toastr from "toastr";

import { bindActionCreators } from "redux";
export class Rooms extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isFetching: props.isFetching,
      rooms: props.rooms
    };
  }

  componentWillMount() {
    this.props.actions.fetchRooms();
  }
  render() {
    if (this.props.isFetching) {
      return <h1>Fetching data</h1>;
    } else {
      return (
        <div>
          <h1>Available rooms</h1>
          <RoomList rooms={this.props.rooms.data} />
        </div>
      );
    }
  }
}

Rooms.propTypes = {
  actions: PropTypes.object.isRequired
};

Rooms.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    rooms: state.rooms,
    isFetching: state.rooms.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchRooms }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
