import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import ChatRoom from "./ChatRoom";
import CreateChatRoom from "./CreateChatRoom";
const roomsRef = collection(db, "rooms");

const ChatContainer = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const q = query(roomsRef, orderBy("createdAt"), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let rooms = [];
      QuerySnapshot.forEach((doc) => {
        rooms.push({ ...doc.data(), id: doc.id });
      });
      console.log(rooms);
      setRooms(rooms);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className="chat-rooms-container">
      <CreateChatRoom />
      <div style={{ paddingTop: 15 }}>
        {rooms?.map((room) => (
          <ChatRoom
            key={room.id}
            roomName={room.name}
            roomDescription={room.description}
          />
        ))}
      </div>
    </main>
  );
};

export default ChatContainer;
