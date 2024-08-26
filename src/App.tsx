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

  const fetchComments = async () => {
    let temp=comments;
    if (isFetching) return; 
    setIsFetching(true);
    try {
      const { comments: fetchedComments, lastVisible: newLastVisible } = await getComments(sortBy, lastVisible);
     temp=[...temp, ...fetchedComments];
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

  // Handle Like and Dislike interactions
  const handleLike = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          if (comment.userLiked) {
            return { ...comment, like: comment.like - 1, userLiked: false };
          } else {
            return {
              ...comment,
              like: comment.like + 1,
              dislike: comment.userDisliked ? comment.dislike - 1 : comment.dislike,
              userLiked: true,
              userDisliked: false,
            };
          }
        }
        return comment;
      })
    );
  };

  const handleDislike = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          if (comment.userDisliked) {
            return { ...comment, dislike: comment.dislike - 1, userDisliked: false };
          } else {
            return {
              ...comment,
              dislike: comment.dislike + 1,
              like: comment.userLiked ? comment.like - 1 : comment.like,
              userDisliked: true,
              userLiked: false,
            };
          }
        }
        return comment;
      })
    );
  };

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
          <CommentList comments={comments} onLike={handleLike} onDislike={handleDislike} />
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
