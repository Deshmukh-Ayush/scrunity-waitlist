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

import { WaitlistNode } from './waitlist';
import { LabelNode } from './label-node';

const nodeTypes = {
  waitlist: WaitlistNode,
  label: LabelNode,
};

const initialNodes: Node[] = [
  { 
    id: 'hero-label', 
    type: 'label', 
    position: { x: 150, y: 100 }, 
    data: { text: 'Scrunity AI' } 
  },
  { 
    id: 'features-label', 
    type: 'label', 
    position: { x: 50, y: 220 }, 
    data: { text: 'AI-powered ideation.' } 
  },
  { 
    id: 'waitlist-form', 
    type: 'waitlist', 
    position: { x: 100, y: 350 }, 
    data: { title: 'Reserve your spot' } 
  },
];

const initialEdges: Edge[] = [
  { id: 'e1', source: 'hero-label', target: 'features-label', animated: true, style: { stroke: '#d4d4d8' } },
  { id: 'e2', source: 'features-label', target: 'waitlist-form', animated: true, style: { stroke: '#d4d4d8' } },
];

export default function Canvas() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#d4d4d8' } }, eds)), []
  );

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a0a' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        zoomOnScroll={false}
        panOnDrag={false}
        selectionOnDrag
        fitView
        proOptions={{ hideAttribution: true }} // Cleans up the UI
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          color='#525252'
        />
      </ReactFlow>
    </div>
  );
}