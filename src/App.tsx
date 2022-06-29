import React from 'react';
import './App.css';
import { AuthProvider } from './context/auth.context';
import Routes from './router';

function App() {
  return (
    <>
    {/*@ts-ignore*/}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
