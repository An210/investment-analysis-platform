import React from 'react';
import WorkflowEditor from './components/WorkflowEditor';
import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Investment Analysis Platform</Typography>
        </Toolbar>
      </AppBar>
      <WorkflowEditor />
    </div>
  );
}

export default App;