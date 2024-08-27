import { TextField, Button, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LinkIcon from '@mui/icons-material/Link';
import { addComment } from '../services/commentService';
import { useAuth } from './AuthProvider';
import React, { useState } from 'react';

const CommentInput: React.FC = () => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);

  const updateCommentStyle = () => {
    let formattedComment = comment;
    if (isBold) formattedComment = `**${formattedComment}**`;
    if (isItalic) formattedComment = `*${formattedComment}*`;
    if (isUnderlined) formattedComment = `__${formattedComment}__`;

    return formattedComment;
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
   
      const limitedComment = comment.length > 250 ? comment.substring(0, 250) : comment;

     
      const styledComment = updateCommentStyle();

      await addComment({ text: styledComment, userId: user?.uid, userName: user?.displayName, file, like: 0, dislike: 0,
        profile: user?.photoURL });
      setComment('');
      setFile(null);
      setIsBold(false);
      setIsItalic(false);
      setIsUnderlined(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="comment-input-container">
      <TextField
        value={comment}
        onChange={(e) => setComment(e.target.value.slice(0, 250))} 
        placeholder="Add a comment"
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
      />
      <div className="comment-input-actions">
        <IconButton
          onClick={() => setIsBold(!isBold)}
          color={isBold ? 'primary' : 'default'}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          onClick={() => setIsItalic(!isItalic)}
          color={isItalic ? 'primary' : 'default'}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          onClick={() => setIsUnderlined(!isUnderlined)}
          color={isUnderlined ? 'primary' : 'default'}
        >
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton>
          <LinkIcon />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </IconButton>
      </div>
      <Button onClick={handleCommentSubmit} variant="contained" >Send</Button>
    </div>
  );
};

export default CommentInput;
