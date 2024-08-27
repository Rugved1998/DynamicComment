import React from 'react';
import Comment from './Comment';

interface CommentListProps {
  comments: any[]; 
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onLike, onDislike }) => {
  
  
  return (
    <div className='comment-list-container'>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onLike={() => onLike(comment.id)}
          onDislike={() => onDislike(comment.id)}
        />
      ))}
    </div>
  );
};

export default CommentList;
