import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const timeStamp = message.createdAt?.toDate();
  const align = message.uid === user.uid ? "right" : "";

  return (
    <div className="chat-bubble-wrapper">
      <div className={`chat-bubble ${align}`}>
        <img
          className="chat-bubble__left"
          src={message.avatar}
          alt="user avatar"
          referrerPolicy="no-referrer"
        />
        <div className="chat-bubble__right">
          <p className="user-name">{message.name}</p>
          <p className="user-message">{message.text}</p>
        </div>
      </div>
      <p
        className={`message-time ${align}`}
        title={timeStamp?.toLocaleTimeString([], {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      >
        {timeStamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
      </p>
    </div>
  );
};

export default Message;
