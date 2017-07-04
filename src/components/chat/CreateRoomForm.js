import React from "react";
import TextInput from "../common/TextInput";

const CreateRoomForm = ({ name, onCreate, onChange, creating }) => {
  return (
    <form>
      <h1>Create a chat room</h1>

      <TextInput
        name="room"
        label="Room Info"
        onChange={onChange}
        value={name}
        placeholder = "Enter a room name"
      />

      <input
        type="submit"
        disabled={creating}
        value={creating ? "creating ..." : "Create"}
        className="btn btn-primary"
        onClick={onCreate}
      />
    </form>
  );
};

CreateRoomForm.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
  creating: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default CreateRoomForm;
