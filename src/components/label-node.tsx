import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

export type LabelNodeData = { text: string };
export type LabelNodeType = Node<LabelNodeData, "label">;

export function LabelNode({ data, isConnectable, selected }: NodeProps<LabelNodeType>) {
  return (
    <div className={`px-2 py-1 bg-transparent transition-opacity duration-200 ${selected ? "opacity-100" : "opacity-70 hover:opacity-100"
      }`}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0 w-full h-full !transform-none top-0 rounded-none bg-transparent border-none" />
      <span className="text-xl md:text-[28px] font-medium text-white tracking-tight leading-tight whitespace-nowrap">
        {data.text}
      </span>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0 w-full h-full !transform-none bottom-0 rounded-none bg-transparent border-none" />
    </div>
  );
}