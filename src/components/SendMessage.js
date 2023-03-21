import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";

const SendMessage = ({ scroll, room }) => {

  const [message, setMessage] = useState("");

  const clearInput = () => setMessage("");

  const messageInput = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", e => !(e.metaKey || e.ctrlKey) && messageInput.current?.focus());
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") return;
    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      room,
      uid,
    });

    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={(event) => {
        sendMessage(event);
        clearInput();
      }}
      className="send-message"
    >
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        autoFocus
        id="messageInput"
        name="messageInput"
        type="text"
        autoComplete="off"
        className="form-input__input"
        placeholder="Type a message"
        ref={messageInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
