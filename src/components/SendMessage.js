import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { MdAddPhotoAlternate as Photo } from 'react-icons/md';
import { auth, db } from '../firebase';

const SendMessage = ({ scroll, room }) => {
  const [message, setMessage] = useState('');
  const [imageURL, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);
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

    scroll.current?.scrollIntoView({ behavior: 'smooth' });
    setProgress(0)
  };

  const uploadImage = file => {
    // TODO: filter based on list of approved file types
    const metadata = {
      contentType: file.type,
    };
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      'state_changed',
      snapshot => {
        //observe state
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => setImageUrl(downloadURL));
      }
    );
  };

  const imgInputStyle = {
    borderRadius: `0`,
    marginRight: `2px`,
    cursor: `pointer`,
    backgroundColor: `white`,
    borderRadius: `0 5px 5px 0`,
    color: `#04220e`,
    padding: `0 12px`,
    borderLeft: `1px solid #04220e77`,
    transition: `background-color 0.5s ease`,
    background: `linear-gradient(to top, #0f0 ${progress}%, #fff ${progress}%)`,
  };

  useEffect(() => {
    const handleFileInputChange = () => {
      const files = fileInput.current?.files;
      if (files) {
        uploadImage(files[0]);
      }
    };

    fileInput.current.addEventListener('change', handleFileInputChange);
    return () => {
      if (fileInput.current) {
        fileInput.current.removeEventListener('change', handleFileInputChange);
      }
    };
  }, [fileInput, uploadImage]);

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
      <label htmlFor='imgInput' style={imgInputStyle}>
        <Photo size={36} />
      </label>
      <input type='file' id='imgInput' ref={fileInput} />
      <button type='submit'>Send</button>
    </form>
  );
};

export default SendMessage;
