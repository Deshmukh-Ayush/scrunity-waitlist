"use client"

import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

import { IsometricNode } from './isometric-node';
import { FactoryNode } from './factory-node';
import { OutputNode } from './output-node';
import { addEmailToWaitlist } from "@/lib/appwrite";

const nodeTypes = {
  isometricNode: IsometricNode,
  factoryNode: FactoryNode,
  outputNode: OutputNode,
};

// Precise static edges matching the sketch perfectly
const initialEdges: Edge[] = [
  // Left side: straight, dashed lines connecting to the central factory
  { id: 'el-1', source: 'in-img1', target: 'factory', type: 'straight', style: { stroke: '#000000', strokeWidth: 1.5, strokeDasharray: '6 6' } },
  { id: 'el-2', source: 'in-vid1', target: 'factory', type: 'straight', style: { stroke: '#000000', strokeWidth: 1.5, strokeDasharray: '6 6' } },
  { id: 'el-3', source: 'in-pdf1', target: 'factory', type: 'straight', style: { stroke: '#000000', strokeWidth: 1.5, strokeDasharray: '6 6' } },
  { id: 'el-4', source: 'in-vid2', target: 'factory', type: 'straight', style: { stroke: '#000000', strokeWidth: 1.5, strokeDasharray: '6 6' } },
  { id: 'el-5', source: 'in-pdf2', target: 'factory', type: 'straight', style: { stroke: '#000000', strokeWidth: 1.5, strokeDasharray: '6 6' } },

  // Right side: solid smoothstep/bezier lines branching outwards
  { id: 'er-1', source: 'out-card', target: 'out-text', type: 'bezier', style: { stroke: '#000000', strokeWidth: 1 } },
  { id: 'er-2', source: 'out-card', target: 'out-pdf', type: 'bezier', style: { stroke: '#000000', strokeWidth: 1 } },
  { id: 'er-3', source: 'out-card', target: 'out-mindmap', type: 'bezier', style: { stroke: '#000000', strokeWidth: 1 } },
];

export default function Canvas() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [mounted, setMounted] = useState(false);

  // Waitlist form state
  const [email, setEmail] = useState('');
  const [formMode, setFormMode] = useState<"button" | "input" | "loading" | "success">("button");

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFormMode("loading");
    try {
      await addEmailToWaitlist(email);
      setFormMode("success");
    } catch {
      setFormMode("input");
    }
  };

  useEffect(() => {
    // We center everything relative to the user's viewport width to ensure the artboard looks good everywhere
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const initialNodesArray: Node[] = [
      // Left side inputs (isometric)
      { id: 'in-img1', type: 'isometricNode', position: { x: cx - 600, y: cy - 220 }, data: { type: 'image' }, draggable: true },
      { id: 'in-vid1', type: 'isometricNode', position: { x: cx - 550, y: cy + 50 }, data: { type: 'video' }, draggable: true },
      { id: 'in-pdf1', type: 'isometricNode', position: { x: cx - 400, y: cy - 80 }, data: { type: 'pdf' }, draggable: true },
      { id: 'in-vid2', type: 'isometricNode', position: { x: cx - 350, y: cy + 180 }, data: { type: 'video' }, draggable: true },
      { id: 'in-pdf2', type: 'isometricNode', position: { x: cx - 200, y: cy + 150 }, data: { type: 'pdf' }, draggable: true },

      // Center Factory node
      { id: 'factory', type: 'factoryNode', position: { x: cx - 180, y: cy - 100 }, data: {}, draggable: true },

      // Right side outputs
      { id: 'out-text', type: 'outputNode', position: { x: cx + 220, y: cy - 250 }, data: { type: 'text', text: 'Researching some epic shit' }, draggable: true },
      { id: 'out-card', type: 'outputNode', position: { x: cx + 200, y: cy - 120 }, data: { type: 'card', text: 'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears.' }, draggable: true },
      { id: 'out-pdf', type: 'outputNode', position: { x: cx + 180, y: cy + 100 }, data: { type: 'pdfOutline' }, draggable: true },
      { id: 'out-mindmap', type: 'outputNode', position: { x: cx + 380, y: cy + 90 }, data: { type: 'mindmap' }, draggable: true },
    ];

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNodes(initialNodesArray);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []
  );

  if (!mounted) return <div className="w-screen h-screen bg-white" />;

  return (
    <main className="relative w-screen h-screen bg-white overflow-hidden selection:bg-neutral-200">

      {/* Figma Typography Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none mt-[8vh] flex flex-col items-center justify-start text-center">

        {/* Main Serif Header */}
        <h1 className="font-instrument-serif text-[64px] md:text-[80px] leading-[0.9] tracking-tight text-[#111111]">
          Research your ideas <br />
          Like a Pro with Scrunity
        </h1>

        {/* Sans-serif Subtitle */}
        <p className="mt-6 text-[14px] md:text-[15px] font-bold tracking-tight text-[#111111] max-w-[500px] leading-snug">
          Import your everything on Scrunity and use AI on top of it and <br />
          create mind-maps, flows and increase your productivity of research
        </p>

        {/* Waitlist Button / Form (Pointer events auto so user can click) */}
        <div className="mt-8 pointer-events-auto h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {formMode === "button" && (
              <motion.button
                key="btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setFormMode("input")}
                className="bg-[#111111] text-white px-8 py-3 rounded-md text-[13px] font-semibold tracking-wide hover:bg-[#222222] transition-colors"
              >
                Join Waitlist
              </motion.button>
            )}

            {(formMode === "input" || formMode === "loading") && (
              <motion.form
                key="form"
                initial={{ opacity: 0, width: 200 }}
                animate={{ opacity: 1, width: 320 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleWaitlistSubmit}
                className="flex items-center gap-2"
              >
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={formMode === "loading"}
                  className="flex-1 px-4 py-3 rounded-md border-2 border-neutral-300 text-[13px] text-neutral-900 focus:outline-none focus:border-[#111111] transition-colors"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={formMode === "loading" || !email}
                  className="bg-[#111111] text-white px-5 py-3 rounded-md text-[13px] font-semibold border-2 border-[#111111] hover:bg-transparent hover:text-[#111111] transition-colors flex items-center justify-center min-w-[100px]"
                >
                  {formMode === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
                </button>
              </motion.form>
            )}

            {formMode === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-md border border-emerald-200 text-[13px] font-medium"
              >
                You&apos;re on the waitlist!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        zoomOnScroll={false}
        panOnDrag={true}
        selectionOnDrag
        fitView={false}
        proOptions={{ hideAttribution: true }}
        className="z-10"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={32}
          size={1.5}
          color='#d4d4d4'
        />
      </ReactFlow>

    </main>
  );
}