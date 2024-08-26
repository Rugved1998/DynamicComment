import React, { useEffect, useState } from 'react';
import { getComments } from '../services/commentService';
import Comment from './Comment';

const CommentList: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [sortBy, setSortBy] = useState('createdAt');

  const fetchComments = async () => {
    
    const { comments, lastVisible: newLastVisible } = await getComments(sortBy, lastVisible);
    setComments(prev => [...prev, ...comments]);
    setLastVisible(newLastVisible);
  };

  useEffect(() => {
    fetchComments();
  }, [sortBy]);

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
