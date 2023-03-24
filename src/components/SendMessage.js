import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '../firebase';
import { MdAddPhotoAlternate as Photo } from 'react-icons/md';

const SendMessage = ({ scroll, room }) => {
  const [message, setMessage] = useState('');
  const [imageURL, setImageUrl] = useState('');
  const messageInput = useRef(null);
  const fileInput = useRef(null);

  const clearInput = () => {
    setMessage('');
    setImageUrl('');
    fileInput.current.value = '';
  };

  useEffect(() => {
    window.addEventListener(
      'keydown',
      e => !(e.metaKey || e.ctrlKey) && messageInput.current?.focus()
    );
  }, []);

  const sendMessage = async event => {
    event.preventDefault();

    if (message.trim() === '' && !imageURL) return;
    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, 'messages'), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      imageURL: imageURL || null,
      room,
      uid,
    });

    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  const uploadImage = file => {
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed', () =>
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => setImageUrl(downloadURL))
    );
  };

  useEffect(() => {
    fileInput.current.addEventListener('change', () => {
      const files = fileInput.current?.files;
      if (files) {
        uploadImage(files[0]);
      }
    });
  });

  return (
    <form
      onSubmit={event => {
        sendMessage(event);
        clearInput();
      }}
      className='send-message'
    >
      <label htmlFor='messageInput' hidden>
        Enter Message
      </label>
      <input
        autoFocus
        id='messageInput'
        name='messageInput'
        type='text'
        autoComplete='off'
        className='form-input__input'
        placeholder='Type a message'
        ref={messageInput}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <label htmlFor='imgInput'>
        <Photo size={36} />
      </label>
      <input type='file' id='imgInput' ref={fileInput} />
      <button type='submit'>Send</button>
    </form>
  );
};

export default SendMessage;
