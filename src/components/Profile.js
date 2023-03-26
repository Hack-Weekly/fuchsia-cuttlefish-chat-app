import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import IconUserCircle from '../img/IconUserCircle';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  let navigate = useNavigate();

  if (!user) return <></>;

  const { uid, displayName, photoURL, email } = auth.currentUser;

  const signOut = () => {
    auth.signOut();
    navigate('/');
  };

  window.addEventListener(
    'click',
    e => open && !document.getElementById('profile-modal').contains(e.target) && setOpen(!open)
  );

  return (
    <div
      id='profile-modal'
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#36454F',
        padding: 8,
        borderRadius: 4,
        position: 'fixed',
        top: 0,
        right: 30,
      }}
    >
      {uid &&
        (photoURL ? (
          <img
            src={photoURL}
            alt='User Avatar'
            onClick={() => setOpen(!open)}
            referrerPolicy='no-referrer'
            style={{
              borderRadius: '100%',
              boxShadow: '0 0 5px -2px #000',
              marginLeft: 'auto',
              cursor: 'pointer',
            }}
            width={40}
          />
        ) : (
          <IconUserCircle alt='User Avatar' onClick={() => setOpen(!open)} width={40} />
        ))}
      {open && (
        <>
          <div
            style={{
              fontFamily: 'sans-serif',
              wordWrap: 'break-word',
              marginTop: 10,
            }}
          >
            {displayName}
          </div>
          <div
            style={{
              fontFamily: 'sans-serif',
              wordWrap: 'break-word',
              marginTop: 10,
            }}
          >
            {email}
          </div>
          <button
            onClick={signOut}
            className='sign-out'
            type='button'
            style={{
              marginTop: 10,
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
