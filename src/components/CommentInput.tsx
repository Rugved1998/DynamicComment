
// import React from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LinkIcon from '@mui/icons-material/Link';

const CommentInput: React.FC = () => {
  return (
    <div style={{ margin: '20px 0' }}>
       <TextField
        placeholder="Add a comment"
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        style={{ marginBottom: '10px' }}
      />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IconButton><FormatBoldIcon /></IconButton>
        <IconButton><FormatItalicIcon /></IconButton>
        <IconButton><FormatUnderlinedIcon /></IconButton>
        <IconButton><LinkIcon /></IconButton>
        <input type="file" style={{ display: 'none' }} id="fileInput" />
        <label htmlFor="fileInput">
          <Button variant="outlined" component="span">Attach File</Button>
        </label>
      </div>
      
      <Button variant="contained" style={{ marginTop: '10px' }}>
        Send
      </Button>
      
    </div>
  );
};

export default CommentInput;
