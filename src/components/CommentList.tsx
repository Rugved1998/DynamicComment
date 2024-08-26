import React from 'react';
import Comment from './Comment';

interface CommentListProps {
  comments: any[]; 
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
 

  return (
    <div>
     
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
