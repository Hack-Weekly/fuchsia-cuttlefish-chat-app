import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import SendMessage from "./SendMessage";

const messagesRef = collection(db, "messages");

const ChatBox = () => {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      messagesRef,
      where("room", "==", roomName),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, [roomName]);

  return (
    <main className="chat-box">
      <ChatHeader roomName={roomName} />
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} room={roomName} />
    </main>
  );
};

export default ChatBox;
