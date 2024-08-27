import React from 'react';
import Comment from './Comment';

interface CommentListProps {
  comments: any[]; 
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onLike, onDislike }) => {
  const cons=()=>{console.log('Comment List')}
  {cons();}
  return (
    <div>
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
