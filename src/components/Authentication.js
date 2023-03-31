import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';

const Authentication = () => {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const background = useRef(null);

  const auth = getAuth();

  const toggleModal = () => {
    setOpen(!open);
  };

  // const toggleModal = e => {
  //   console.log('toggle', e);
  //   e && e.preventDefault();
  //   setOpen(!open);
  // };

  const anonymousSignIn = async event => {
    try {
      if (displayName) {
        localStorage.removeItem('accent');
        await signInAnonymously(auth);
        await updateProfile(auth.currentUser, { displayName });
      }
    } catch (e) {}
  };

  const enterKeyPressed = event => {
    if (event.key === 'Enter' && displayName) {
      anonymousSignIn();
    }
  };

  const googleSignIn = async event => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    } catch (e) {}
  };

  const githubSignIn = async event => {
    try {
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider);
    } catch (e) {}
  };

  useEffect(() => {
    const escKeyPressed = e => {
      if (e.key === 'Escape' || e.key === 'Esc' || e.code === 27) toggleModal();
    };
    window.addEventListener('keydown', escKeyPressed);
    return () => window.removeEventListener('keydown', escKeyPressed);
  });

  const backgroundClick = e => e.target === background.current && toggleModal();

  return (
    <div>
      <button onClick={toggleModal} tabIndex={0}>
        Sign in
      </button>
      {open && (
        <div className='auth-bg' onClick={backgroundClick} ref={background}>
          <div className='auth-window' id='auth-modal'>
            <h1 className='log-in'>Log in</h1>
            <button className='auth-close' onClick={toggleModal} tabIndex={0}>
              ✕
            </button>
            <div className='anon-form'>
              <label>Display Name</label>
              <input
                type='text'
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                onKeyDown={enterKeyPressed}
              ></input>
            </div>
            <button onClick={anonymousSignIn} className='auth-button anon' disabled={!displayName}>
              Anonymous
            </button>

            <div>
              <span> - - - - - - - - - - </span>
              OR
              <span> - - - - - - - - - -</span>
            </div>
            <button onClick={googleSignIn} className='auth-button google'>
              Continue with Google
            </button>
            <button onClick={githubSignIn} className='auth-button github'>
              Continue with Github
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authentication;
