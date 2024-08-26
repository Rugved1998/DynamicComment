import React, { useEffect, useState } from 'react';
import './App.css';
import CommentInput from './components/CommentInput';
import UserName from './components/UserName';
import { Button } from '@mui/material';
import { useAuth } from './components/AuthProvider';
import Header from './components/Header';
import CommentList from './components/CommentList';
import { getComments } from './services/commentService';

function App() {
  const { user, login, logout } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [isFetching, setIsFetching] = useState(false);
  const [isLoad,setIsLoad]=useState(false);

  const fetchComments = async () => {
    let temp= comments;
    if (isFetching) return; 
    setIsFetching(true);
    try {
      const { comments: fetchedComments, lastVisible: newLastVisible } = await getComments(sortBy, lastVisible);
      console.log("Fetched comments:", fetchedComments);
      temp=[...temp,...fetchedComments]
      
      setLastVisible(newLastVisible);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsFetching(false);
      setComments(temp); 
    }
  };

  useEffect(() => {
    fetchComments();

  }, [sortBy]); 

  return (
    <div className="App">
      {user ? (
        <>
          <div className="Panel-login">
            <UserName user={user} />
            <Button onClick={logout}>Logout</Button>
          </div>
          <Header />
          <CommentInput />
          <CommentList comments={comments} />
        </>
      ) : (
        <>
          <div className="Panel-logout">
            <Button onClick={login}>Sign in with Google</Button>
          </div>
          <Header />
          <CommentInput />
        </>
      )}
    </div>
  );
}

export default App;
