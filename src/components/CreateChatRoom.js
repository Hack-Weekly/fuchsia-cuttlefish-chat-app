import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

const CreateChatRoom = () => {
    const [room, setRoom] = useState({ name: '', description: '' });
    const clearInput = () => setRoom({ name: '', description: '' });

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
        <form
            onSubmit={(event) => {
                createChatRoom(event);
                clearInput();
            }}
            className="room-form"
        >
            <label htmlFor="roomNameInput" hidden>Enter Room Name</label>
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
    )
};

export default CreateChatRoom;