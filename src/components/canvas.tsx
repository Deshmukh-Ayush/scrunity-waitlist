"use client"

import { useState, useCallback } from 'react';
import { 
  ReactFlow, 
  applyNodeChanges, 
  applyEdgeChanges, 
  addEdge,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TextUpdaterNode } from './text-node';


const initialEdges: Edge[] = [
  { id: 'n1-n2', source: 'n1', target: 'n2'}
];
const nodeTypes = {
  textUpdater: TextUpdaterNode // This must be 'textUpdater' to match your data
};
const initialNodes: Node[] = [
  { 
    id: 'n1', 
    type: 'textUpdater', 
    position: { x: 0, y: 0 }, 
    data: { label: 'Node 1', value: 'Hello' } 
  },
  { 
    id: 'n2', 
    type: 'textUpdater', 
    position: { x: 0, y: 100 }, 
    data: { label: 'Node 2', value: 'World' } 
  },
];



export default function Canvas() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
 
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        panOnDrag={false}
        selectionOnDrag
        panOnScroll
        fitView
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#999" 
        />
      </ReactFlow>
    </div>
  );
}