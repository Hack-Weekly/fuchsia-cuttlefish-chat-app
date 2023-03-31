import chroma from 'chroma-js';
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
import Message from './Message';
import NavBar from './NavBar';
import SendMessage from './SendMessage';

const COLORS = chroma
  .scale(['black', 'brown', 'red', 'green', 'blue', 'purple', 'grey'])
  .colors(32);

const messagesRef = collection(db, 'messages');

const getAccent = () => COLORS[Math.floor(Math.random() * 32)];

const ChatBox = () => {
  let navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
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
    if (isMounted && !isAuthenticating) {
      const storedAccent = localStorage.getItem('accent');
      if (!storedAccent) {
        const chosenAccent = getAccent();
        setAccent(chosenAccent);
        localStorage.setItem('accent', chosenAccent);
      } else setAccent(storedAccent);

      setTimeout(() => {
        scroll.current?.scrollIntoView({ behavior: 'instant' });
      }, 250);
    }
  }, [isAuthenticating, isMounted]);

  useAuth().then(
    () => {
      setIsAuthenticating(false);
    },
    error => {
      navigate('/');
    }
  );

  if (isAuthenticating) return <Loader />;
  else
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
};

export default ChatBox;
