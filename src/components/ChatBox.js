import chroma from 'chroma-js';
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useParams } from 'react-router-dom';
import { auth, db } from '../firebase';
import Message from './Message';
import NavBar from './NavBar';
import SendMessage from './SendMessage';

const COLORS = chroma
  .scale(['black', 'brown', 'red', 'green', 'blue', 'purple', 'grey'])
  .colors(32);
const messagesRef = collection(db, 'messages');

const getAccent = () => COLORS[Math.floor(Math.random() * 32)];

const ChatBox = () => {
  const [user] = useAuthState(auth);
  const [accent, setAccent] = useState('');
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      messagesRef,
      where('room', '==', roomName),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      let messages = [];
      QuerySnapshot.forEach(doc => {
        messages.unshift({ ...doc.data(), id: doc.id });
      });
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

  useEffect(() => {
    if (user) {
      const storedAccent = localStorage.getItem('accent');
      if (!storedAccent) {
        const chosenAccent = getAccent();
        setAccent(chosenAccent);
        localStorage.setItem('accent', chosenAccent);
      } else setAccent(storedAccent);
    }
  }, [user, messages]);

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
          <SendMessage scroll={scroll} room={roomName} accent={accent} />
        </main>
      </>
    );
  } else {
    return <Navigate to='/' />;
  }
};

export default ChatBox;
