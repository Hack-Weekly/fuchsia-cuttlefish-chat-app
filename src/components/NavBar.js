import React from 'react';
import Profile from './Profile';
import { Link } from 'react-router-dom';

const NavBar = ({ title }) => {
  return (
    <nav className='nav-bar'>
      <Link to='/' style={{ display: 'flex' }}>
        <img src='/logo192.png' width={50} alt='Logo' style={{ margin: 10 }} />
        {title && <div style={{ margin: 'auto' }}>Change chats</div>}
      </Link>
      <h1
        style={{
          textTransform: 'capitalize',
          width: '100%',
          marginRight: '86px',
          textAlign: 'center',
        }}
      >
        {title || 'Cuttlefish Club'}
      </h1>
      <Profile />
    </nav>
  );
};

export default NavBar;
