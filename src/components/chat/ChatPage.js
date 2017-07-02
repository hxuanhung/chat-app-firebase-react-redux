import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendMessage } from "../../actions/chatActions";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import Members from "./Members";
import toastr from "toastr";
import { leaveRoom } from "../../actions/roomActions";

export class ChatPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      roomId: props.roomId,
      text: "",
      sending: false,
      user: props.user
    };

    this.updateMessageState = this.updateMessageState.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  updateMessageState(event) {
    const field = event.target.message;
    let text = event.target.value;
    return this.setState({ text: text });
  }

  sendMessage(event) {
    event.preventDefault();

    this.setState({ sending: true });

    this.props.actions
      .sendMessage(this.state.text, this.state.user, this.props.roomId)
      .then(() => this.setState({ sending: false, text: "" }))
      .catch(error => {
        toastr.error(error.message);
        this.setState({ sending: false });
      });
  }

  onLeave() {
    this.props.actions
      .leaveRoom(this.props.roomId, this.props.user)
      .then(() => {
        toastr.success("Leave group");
      })
      .catch(error => {
        toastr.error(error.message);
      });
  }
  render() {
    return (
      <div>
        <input
          type="button"
          value="Leave Group"
          className="btn btn-primary"
          onClick={this.onLeave}
        />
        <Members />
        <Messages />
        <MessageInput
          onChange={this.updateMessageState}
          onSave={this.sendMessage}
          sending={this.state.sending}
          text={this.state.text}
        />
      </div>
    );
  }
}

ChatPage.propTypes = {
  actions: PropTypes.object.isRequired
};

ChatPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const pathname = state.routing.locationBeforeTransitions.pathname;
  return {
    user: state.user,
    roomId: pathname.substring(pathname.lastIndexOf(`/`) + 1, pathname.len)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ sendMessage, leaveRoom }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
