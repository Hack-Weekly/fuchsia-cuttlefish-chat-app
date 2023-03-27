import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ChatBox from './components/ChatBox';

window.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/r/:roomName',
    element: <ChatBox />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);
