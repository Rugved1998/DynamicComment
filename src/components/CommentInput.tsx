// src/components/CommentInput.tsx
import { TextField, Button, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LinkIcon from '@mui/icons-material/Link';
import { addComment } from '../services/commentService';
import { useAuth } from './AuthProvider';
import React,{useState} from 'react';


const CommentInput: React.FC = () => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      await addComment({ text: comment, userId: user?.uid, userName: user?.displayName, file });
      setComment('');
      setFile(null);
    }
  };

  return (
    <div>
      <TextField
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
      />
      <div>
      <IconButton><FormatBoldIcon /></IconButton>
        <IconButton><FormatItalicIcon /></IconButton>
        <IconButton><FormatUnderlinedIcon /></IconButton>
        <IconButton><LinkIcon /></IconButton>

        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      <Button onClick={handleCommentSubmit} variant="contained">Send</Button>
    </div>
  );
};

export default CommentInput;
