import React, { PropTypes } from "react";
import RoomItem from "./RoomItem";
import { Card } from 'semantic-ui-react';
export class RoomList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      rooms: props.rooms,
      user: props.user
    };
  }

  render() {
    return (
      <Card.Group>
        {this.props.rooms.map((room, i) =>
          <RoomItem key={i} room={room} />
        )}
      </Card.Group>
    );
  }
}

export default RoomList;
