import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

const CreateChatRoom = () => {
  const [creating, setCreating] = useState(false);
  const [room, setRoom] = useState({ name: "", description: "" });
  const clearInput = () => setRoom({ name: "", description: "" });

  const createChatRoom = async (event) => {
    event.preventDefault();

    if (!room.name || !room.description) return;

    await addDoc(collection(db, "rooms"), {
      name: room.name,
      description: room.description,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <>
      <button
        onClick={() => {
          if (creating) clearInput();
          setCreating(!creating);
        }}
        className="create-button"
      >
        {creating ? "Cancel" : "Create new room"}
      </button>
      <form
        onSubmit={(event) => {
          createChatRoom(event);
          clearInput();
        }}
        className="room-form"
        style={{
          height: creating ? "150px" : "0px",
          padding: creating ? "" : "0",
        }}
      >
        <label htmlFor="roomNameInput" hidden>
          Enter Room Name
        </label>
        <input
          id="roomNameInput"
          name="roomNameInput"
          type="text"
          className="form-input-room-name"
          placeholder="Enter Room Name"
          value={room.name}
          onChange={(e) => setRoom({ ...room, name: e.target.value })}
        />
        <input
          id="roomDescriptionInput"
          name="roomDescriptionInput"
          type="text"
          className="form-input-room-description"
          placeholder="Enter Room Description"
          value={room.description}
          onChange={(e) => setRoom({ ...room, description: e.target.value })}
        />
        <button type="submit">Create Room</button>
      </form>
    </>
  );
};

export default CreateChatRoom;
