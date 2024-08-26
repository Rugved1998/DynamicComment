// src/components/Comment.tsx
import React from 'react';

const Comment: React.FC<{ comment: any }> = ({ comment }) => {
  return (
    <div>
      <p><strong>{comment.userName}</strong></p>
      <p>{comment.text}</p>
      
    </div>
  );
};

export default Comment;
