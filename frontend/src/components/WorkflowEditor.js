import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { addEdge, Controls, Background } from 'react-flow-renderer';
import NodePalette from './NodePalette';
import PropertiesPanel from './PropertiesPanel';
import CustomNode from './CustomNode';
import { Button, Tooltip } from '@mui/material';

const initialElements = [];

const nodeTypes = {
  dataSource: CustomNode,
  mlModel: CustomNode,
  output: CustomNode,
};

const WorkflowEditor = () => {
  const [elements, setElements] = useState(initialElements);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = (params) =>
    setElements((els) => addEdge({ ...params, style: { stroke: '#555', strokeWidth: 2 } }, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => els.filter((el) => !elementsToRemove.includes(el)));
  const onLoad = (instance) => {
    setReactFlowInstance(instance);
    instance.fitView();
  };
  const onNodeDragStop = (event, node) => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === node.id) {
          return { ...el, position: node.position };
        }
        return el;
      })
    );
  };
  const onElementClick = (event, element) => {
    if (element.type !== 'edge') {
      setSelectedNode(element);
    }
  };
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${elements.length + 1}`,
        type,
        position,
        data: { label: `${type} Node` },
      };

      setElements((es) => es.concat(newNode));
    },
    [elements, reactFlowInstance]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDragEnter = () => {
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onRunWorkflow = () => {
    console.log('Workflow configuration:', elements);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <NodePalette />
      <div style={{ flex: 1, position: 'relative' }}>
        <Tooltip title="Run the current workflow">
          <Button
            variant="contained"
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 10,
              backgroundColor: '#f0f0f0',
              color: '#000',
              border: '1px solid #ddd',
            }}
            onClick={onRunWorkflow}
          >
            Run Workflow
          </Button>
        </Tooltip>
        <div
          style={{
            height: '100%',
            width: '100%',
            background: isDragging ? '#e0e0e0' : '#fff',
            transition: 'background 0.3s',
          }}
          ref={reactFlowWrapper}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
        >
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onNodeDragStop={onNodeDragStop}
            onElementClick={onElementClick}
            snapToGrid={true}
            snapGrid={[15, 15]}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
      <PropertiesPanel selectedNode={selectedNode} setElements={setElements} />
    </div>
  );
};

export default WorkflowEditor;