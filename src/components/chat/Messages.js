import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { fetchMessages } from "../../actions/chatActions";
import MessageList from "../../components/chat/MessageList";
import toastr from "toastr";
import { bindActionCreators } from "redux";
export class Messages extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isFetching: props.isFetching,
      messages: props.messages,
      roomId: props.roomId
    };
  }

  componentWillMount() {
    this.props.actions.fetchMessages(this.props.roomId);
  }
  render() {
    if (this.props.isFetching) {
      return <h1>Fetching data</h1>;
    } else {
      return (
        <MessageList
          messages={this.props.messages.data[this.props.roomId] || []}
        />
      );
    }
  }
}

Messages.propTypes = {
  actions: PropTypes.object.isRequired
};

Messages.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const pathname = state.routing.locationBeforeTransitions.pathname;
  return {
    messages: state.messages,
    isFetching: state.messages.isFetching,
    roomId: pathname.substring(pathname.lastIndexOf(`/`) + 1, pathname.len)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchMessages }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
