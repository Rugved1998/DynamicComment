import React from 'react';

interface CommentProps {
  comment: any;
  onLike: () => void;
  onDislike: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onLike, onDislike }) => {
  return (
    <div>
      <p><strong>{comment.userName}</strong></p>
      <p>{comment.text}</p>
     
      <button onClick={onLike}>{comment.userLiked ? "Unlike" : "Like"}</button>
      <label>{`${comment.like}`}</label>
      
      <button onClick={onDislike}>{comment.userDisliked ? "Undislike" : "Dislike"}</button>
      <label>{` ${comment.dislike}`}</label>
    </div>
  );
};

export default Comment;
