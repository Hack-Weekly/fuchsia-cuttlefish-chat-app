import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { TbPhotoCheck, TbPhotoPlus, TbPhotoUp } from 'react-icons/tb';
import { auth, db } from '../firebase';

const SendMessage = ({ scroll, room, accent }) => {
  const [message, setMessage] = useState('');
  const [imageURL, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const messageInput = useRef(null);
  const fileInput = useRef(null);

  const BG_COLOR = window.darkMode ? '#000' : '#fff';

  const clearInput = keepText => {
    !keepText && setMessage('');
    setImageUrl('');
    setProgress(0);
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
      accent,
      room,
      uid,
    });

    scroll.current?.scrollIntoView({ behavior: 'smooth' });
    setProgress(0);
  };

  const uploadImage = useCallback(
    file => {
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
        },
        error => {
          // handle error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => setImageUrl(downloadURL));
        }
      );
    },
    [setProgress, setImageUrl]
  );

  const loadingBackground = {
    background: `linear-gradient(to top, #0f0 ${progress}%, ${BG_COLOR} ${progress}%)`,
    color: progress === 100 && 'black',
  };

  const imgInputStyle = {
    marginRight: `2px`,
    cursor: `pointer`,
    borderRadius: `0 5px 5px 0`,
    padding: `0 12px`,
    transition: `background-color 0.5s ease`,
    ...(progress ? loadingBackground : {}),
  };

  const imgRemoveStyle = {
    cursor: `pointer`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0.5em',
    marginLeft: -36,
  };

  useEffect(() => {
    const handleFileInputChange = () => {
      const files = fileInput.current?.files;
      if (files) {
        uploadImage(files[0]);
      }
    };

    const inputRef = fileInput.current;
    inputRef.addEventListener('change', handleFileInputChange);
    return () => {
      if (inputRef) {
        inputRef.removeEventListener('change', handleFileInputChange);
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
      {progress === 100 && (
        <div className='inputRemovePhoto' style={imgRemoveStyle} onClick={() => clearInput(true)}>
          <MdOutlineCancel size={24} />
        </div>
      )}
      <label htmlFor='imgInput' style={imgInputStyle}>
        {progress ? (
          progress === 100 ? (
            <TbPhotoCheck size={36} />
          ) : (
            <TbPhotoUp size={36} />
          )
        ) : (
          <TbPhotoPlus size={36} />
        )}
      </label>
      <input type='file' id='imgInput' ref={fileInput} />
      <button type='submit'>Send</button>
    </form>
  );
};

export default SendMessage;
