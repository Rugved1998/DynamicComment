import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import CommentInput from './components/CommentInput';
import UserName from './components/UserName';
import { Button } from '@mui/material';
import { useAuth } from './components/AuthProvider';
import Header from './components/Header';
import CommentList from './components/CommentList';
import { getComments, updateCommentLikesDislikes } from './services/commentService';

function App() {
  const { user, login, logout } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [sortBy, setSortBy] = useState<'createdAt' | 'reactCount'>('createdAt');
  const [isFetching, setIsFetching] = useState(false);
 

  const fetchComments = async () => {
    const uniqueComments = new Map();
    if (isFetching) return;
    setIsFetching(true);
    try {
      const { comments: fetchedComments, lastVisible: newLastVisible } = await getComments(sortBy, lastVisible);
      setLastVisible(newLastVisible);
      
    comments.forEach(comment => uniqueComments.set(comment.id, comment));
    fetchedComments.forEach(comment => uniqueComments.set(comment.id, comment));
     
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsFetching(false);
      setComments(Array.from(uniqueComments.values()));
    }
  };

  useEffect(() => {
    setLastVisible(null);  
    setComments([]);  
    fetchComments(); 
  }, [sortBy]);

  const sortedComments = useMemo(() => {
    console.log("Comment useMEmo: "+comments );
    let sorted = comments;
   
    if (sortBy === 'createdAt') {
      sorted.sort((x, y) => y.createdAt - x.createdAt);
    } else if (sortBy === 'reactCount') {
      sorted.sort((x, y) => y.reactCount - x.reactCount);
    }
    
    return sorted;
  }, [comments, sortBy]);

  const handleSort = (sortBy: 'createdAt' | 'reactCount') => {
    setSortBy(sortBy);
    console.log("Comment sort: "+comments );
  };

  const handleLike = async (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          like: comment.userLiked ? comment.like - 1 : comment.like + 1,
          dislike: comment.userDisliked ? comment.dislike - 1 : comment.dislike,
          userLiked: !comment.userLiked,
          userDisliked: false,
        };
      }
      return comment;
    });
    const updatedComment = updatedComments.find(comment => comment.id === commentId);
    if (updatedComment) {
      await updateCommentLikesDislikes(commentId, updatedComment.like, updatedComment.dislike);
    }
    setComments(updatedComments);
  };

  const handleDislike = async (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          dislike: comment.userDisliked ? comment.dislike - 1 : comment.dislike + 1,
          like: comment.userLiked ? comment.like - 1 : comment.like,
          userDisliked: !comment.userDisliked,
          userLiked: false,
        };
      }
      return comment;
    });
    const updatedComment = updatedComments.find(comment => comment.id === commentId);
    if (updatedComment) {
      await updateCommentLikesDislikes(commentId, updatedComment.like, updatedComment.dislike);
    }
    setComments(updatedComments);
  };

  	
  const commentsCount = comments.length;

  return (
    <div className="App">
      {user ? (
        <>
          <div className="Panel-login">
            <UserName user={user} />
            <Button onClick={logout}>Logout</Button>
          </div>
          <Header handleSort={handleSort}  commentsCount={commentsCount} />
          <CommentInput />
          <CommentList comments={sortedComments} onLike={handleLike} onDislike={handleDislike} />
        </>
      ) : (
        <>
          <div className="Panel-logout">
            <Button onClick={login}>Sign in with Google</Button>
          </div>
          <Header handleSort={handleSort}  commentsCount={commentsCount}/>
          <CommentInput />
          <CommentList comments={sortedComments} onLike={handleLike} onDislike={handleDislike} />
        </>
      )}
    </div>
  );
}

export default App;
