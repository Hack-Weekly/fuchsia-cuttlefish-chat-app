import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import IconUserCircle from '../img/IconUserCircle';
import ImageModal from './ImageModal';

const BaseMessage = ({ user, text, avatar, accent }) => (
  <>
    {avatar ? (
      <img
        className='chat-bubble__left'
        src={avatar}
        alt='user avatar'
        referrerPolicy='no-referrer'
      />
    ) : (
      <IconUserCircle className='chat-bubble__left' alt='user avatar' />
    )}
    <div className='chat-bubble__right'>
      <p className='user-name' style={{ color: accent }}>
        {user}
      </p>
      <p className='user-message'>{text}</p>
    </div>
  </>
);

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const [imageOpen, setImageOpen] = useState(false);
  const timeStamp = message.createdAt?.toDate();
  const align = message.uid === user.uid ? 'right' : '';

  return (
    <div className='chat-bubble-wrapper'>
      <div className={`chat-bubble ${align}`}>
        {message.imageURL ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 10,
              }}
            >
              <BaseMessage
                user={message.name}
                text={message.text}
                avatar={message.avatar}
                accent={message.accent}
              />
            </div>
            <div>
              <img
                src={message.imageURL}
                style={{ maxWidth: '50vw' }}
                alt=''
                onClick={() => {
                  setImageOpen(true);
                }}
              />
            </div>
            {imageOpen && <ImageModal imgLink={message.imageURL} setImageOpen={setImageOpen} />}
          </div>
        ) : (
          <BaseMessage
            user={message.name}
            text={message.text}
            avatar={message.avatar}
            accent={message.accent}
          />
        )}
      </div>
      <p
        className={`message-time ${align}`}
        title={timeStamp?.toLocaleTimeString([], {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      >
        {timeStamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
      </p>
    </div>
  );
};

export default Message;
