import './App.css';
import NavBar from './components/NavBar';
import ChatContainer from './components/ChatContainer';
import Welcome from './components/Welcome';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const [user] = useAuthState(auth);
  return (
    <div className='App'>
      {loading ? <SplashScreen /> : <></>}
      <NavBar />
      {!user ? <Welcome /> : <ChatContainer />}
    </div>
  );
}

export default App;
