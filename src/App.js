import './App.css';
import NavBar from './components/NavBar';
import ChatContainer from './components/ChatContainer';
import Welcome from './components/Welcome';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';

function App() {
  const [appLoaded, setAppLoaded] = useState(sessionStorage.getItem('appLoaded'));

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.setItem('appLoaded', true);
      setAppLoaded(sessionStorage.getItem('appLoaded'));
    }, 500);
  }, []);

  const [user] = useAuthState(auth);
  return (
    <div className='App'>
      {appLoaded ? <></> : <SplashScreen />}
      <NavBar />
      {!user ? <Welcome /> : <ChatContainer />}
    </div>
  );
}

export default App;
