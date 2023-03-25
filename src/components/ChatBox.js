import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Message from './Message';
import NavBar from './NavBar';
import SendMessage from './SendMessage';

const messagesRef = collection(db, 'messages');

const ChatBox = () => {
  const [user] = useAuthState(auth);
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const scroll = useRef();

  useEffect(() => {
    const q = query(messagesRef, where('room', '==', roomName), orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      let messages = [];
      QuerySnapshot.forEach(doc => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);

      setIsMounted(true);
    });

    return () => unsubscribe;
  }, [roomName]);

  useEffect(() => {
    if (isMounted) {
      setTimeout(() => {
        scroll.current?.scrollIntoView({ behavior: 'instant' });
      }, 250);
    }
  }, [isMounted]);

  if (user) {
    return (
      <>
        <NavBar title={roomName} />
        <main className='chat-box'>
          <div className='messages-wrapper'>
            {messages?.map(message => (
              <Message key={message.id} message={message} />
            ))}
          </div>
          <span ref={scroll}></span>
          <SendMessage scroll={scroll} room={roomName} />
        </main>
      </>
    );
  } else {
    return <Navigate to='/' />;
  }
};

export default ChatBox;
