import React from 'react';
import { Handle } from 'react-flow-renderer';
import { Paper, Typography, Box } from '@mui/material';
import { Database, ModelTraining, Output } from '@mui/icons-material';

const CustomNode = ({ data, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'dataSource':
        return <Database style={{ color: '#555', marginRight: '5px' }} />;
      case 'mlModel':
        return <ModelTraining style={{ color: '#555', marginRight: '5px' }} />;
      case 'output':
        return <Output style={{ color: '#555', marginRight: '5px' }} />;
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={2}
      style={{
        padding: '10px',
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        minWidth: '120px',
        textAlign: 'center',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Handle
        type="target"
        position="left"
        style={{ background: '#555', width: '10px', height: '10px' }}
      />
      <Box display="flex" alignItems="center" justifyContent="center">
        {getIcon()}
        <Typography variant="body2">{data.label}</Typography>
      </Box>
      <Handle
        type="source"
        position="right"
        style={{ background: '#555', width: '10px', height: '10px' }}
      />
    </Paper>
  );
};

export default CustomNode;