import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import ChatRoom from './ChatRoom';
import CreateChatRoom from './CreateChatRoom';
const roomsRef = collection(db, 'rooms');

const ChatContainer = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const q = query(roomsRef, orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      let rooms = [];
      QuerySnapshot.forEach(doc => {
        rooms.push({ ...doc.data(), id: doc.id });
      });
      setRooms(rooms);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className='chat-rooms-container'>
      <CreateChatRoom />
      <h4 style={{ margin: '8px 0 16px 0' }}>or</h4>
      <h2>Join an existing room</h2>
      <div style={{ paddingTop: 15 }}>
        {rooms?.map(room => (
          <ChatRoom key={room.id} roomName={room.name} roomDescription={room.description} />
        ))}
      </div>
    </main>
  );
};

export default ChatContainer;
