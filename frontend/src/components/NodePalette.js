import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const NodePalette = () => {
  const nodeTypes = [
    { type: 'dataSource', label: 'Data Source' },
    { type: 'mlModel', label: 'ML Model' },
    { type: 'output', label: 'Output' },
  ];

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Paper
      elevation={3}
      style={{
        width: '200px',
        padding: '15px',
        background: '#f0f0f0',
        borderRight: '1px solid #ddd',
        height: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Node Palette
      </Typography>
      {nodeTypes.map((node) => (
        <Box
          key={node.type}
          onDragStart={(event) => onDragStart(event, node.type)}
          draggable
          style={{
            padding: '12px',
            margin: '10px 0',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'grab',
            textAlign: 'center',
            transition: 'background 0.3s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e0e0e0';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Typography variant="body1">{node.label}</Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default NodePalette;