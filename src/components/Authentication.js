import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import React, { useState } from 'react';

const Authentication = () => {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const auth = getAuth();

  const closeWindow = event => {
    event.preventDefault();
    setOpen(false);
  };
  const openWindow = event => {
    event.preventDefault();
    setOpen(true);
  };

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

  const facebookSignIn = async event => {
    try {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider);
    } catch (e) {}
  };

  return (
    <div>
      {!open ? (
        <button onClick={openWindow}>Sign in</button>
      ) : (
        <div className='authentication-window'>
          <img
            className='auth-logo'
            src='/logo192.png'
            alt='Cuttlefish Club logo'
            width={50}
            height={50}
          />
          <p className='auth-close' onClick={closeWindow}>
            X
          </p>
          <div className='auth'>
            <h1 className='log-in'>Log in</h1>
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
            <button onClick={facebookSignIn} className='auth-button facebook'>
              Continue with Facebook
            </button>
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
