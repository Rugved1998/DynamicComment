import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CommentInput from './components/CommentInput';
import UserName  from './components/UserName';
import { Button } from '@mui/material';
// import { AuthProvider } from './components/AuthProvider';
import { useAuth } from './components/AuthProvider';

function App() {
  const { user, login, logout } = useAuth();
  return (
    // Delivered Code

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
   
      <div className="App">
        {user ? (
          <>
            <div className="Panel-login" >
              <UserName/>
              <Button onClick={logout}>Logout</Button>
            </div>
            <CommentInput />
          </>
        ) : (
          <>
            <div className="Panel-logout">
              <Button onClick={login}>Sign in with Google</Button>
            </div>
            <CommentInput/>
          </>
        )}
      

      </div>
    
  );
}

export default App;
