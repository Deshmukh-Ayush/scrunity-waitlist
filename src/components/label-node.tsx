import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

export type LabelNodeData = { text: string };
export type LabelNodeType = Node<LabelNodeData, "label">;

export function LabelNode({ data, isConnectable }: NodeProps<LabelNodeType>) {
  return (
    <div className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-full shadow-sm">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0" />
      <span className="text-xs font-medium text-neutral-600 tracking-tight">
        {data.text}
      </span>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0" />
    </div>
  );
}