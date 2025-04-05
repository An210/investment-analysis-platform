import React from 'react';
import { Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PropertiesPanel = ({ selectedNode, setElements }) => {
  if (!selectedNode) {
    return (
      <Paper
        elevation={3}
        style={{
          width: '250px',
          padding: '15px',
          background: '#f0f0f0',
          borderLeft: '1px solid #ddd',
          height: '100%',
        }}
      >
        <Typography variant="body1">Select a node to configure</Typography>
      </Paper>
    );
  }

  const handleChange = (key, value) => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectedNode.id) {
          const updatedData = { ...el.data, [key]: value };
          return {
            ...el,
            data: {
              ...updatedData,
              label: `${el.type} Node (${key}: ${value})`,
            },
          };
        }
        return el;
      })
    );
  };

  return (
    <Paper
      elevation={3}
      style={{
        width: '250px',
        padding: '15px',
        background: '#f0f0f0',
        borderLeft: '1px solid #ddd',
        height: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Properties: {selectedNode.data.label}
      </Typography>
      {selectedNode.type === 'dataSource' && (
        <FormControl fullWidth variant="outlined" style={{ marginTop: '10px' }}>
          <InputLabel>Data Source Type</InputLabel>
          <Select
            label="Data Source Type"
            onChange={(e) => handleChange('sourceType', e.target.value)}
            value={selectedNode.data.sourceType || ''}
          >
            <MenuItem value="">Select...</MenuItem>
            <MenuItem value="Twitter">Twitter</MenuItem>
            <MenuItem value="Historical Prices">Historical Prices</MenuItem>
            <MenuItem value="GitHub Activity">GitHub Activity</MenuItem>
          </Select>
        </FormControl>
      )}
      {selectedNode.type === 'mlModel' && (
        <FormControl fullWidth variant="outlined" style={{ marginTop: '10px' }}>
          <InputLabel>Model Type</InputLabel>
          <Select
            label="Model Type"
            onChange={(e) => handleChange('modelType', e.target.value)}
            value={selectedNode.data.modelType || ''}
          >
            <MenuItem value="">Select...</MenuItem>
            <MenuItem value="NLP Sentiment Analysis">NLP Sentiment Analysis</MenuItem>
            <MenuItem value="Linear Price Prediction">Linear Price Prediction</MenuItem>
          </Select>
        </FormControl>
      )}
      {selectedNode.type === 'output' && (
        <FormControl fullWidth variant="outlined" style={{ marginTop: '10px' }}>
          <InputLabel>Output Type</InputLabel>
          <Select
            label="Output Type"
            onChange={(e) => handleChange('outputType', e.target.value)}
            value={selectedNode.data.outputType || ''}
          >
            <MenuItem value="">Select...</MenuItem>
            <MenuItem value="Chart">Chart</MenuItem>
            <MenuItem value="Table">Table</MenuItem>
          </Select>
        </FormControl>
      )}
    </Paper>
  );
};

export default PropertiesPanel;