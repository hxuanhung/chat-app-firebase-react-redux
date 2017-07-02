import React from "react";
import TextInput from "../common/TextInput";

const MessageInput = ({ text, onSave, onChange, sending }) => {
  return (
    <form>
      <TextInput
        name="message"
        label="Message"
        onChange={onChange}
        value={text}
        placeholder="Type a message"
      />

      <input
        type="submit"
        disabled={sending}
        value={sending ? "Sending ..." : "Send"}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  );
};

MessageInput.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  sending: React.PropTypes.bool,
  text: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default MessageInput;
