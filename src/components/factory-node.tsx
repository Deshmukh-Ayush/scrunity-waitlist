import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import Image from "next/image";

export type FactoryNodeData = Record<string, unknown>;
export type FactoryNodeType = Node<FactoryNodeData, "factoryNode">;

export function FactoryNode({ isConnectable }: NodeProps<FactoryNodeType>) {
    return (
        <div className="relative w-[300px] h-[300px] flex items-center justify-center pointer-events-none">
            <Image
                src="/scrunity-factory.svg"
                alt="Scrunity Factory"
                fill
                style={{ objectFit: 'contain' }}
                priority
            />
            {/* Handles around the factory box where edges connect */}
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                className="opacity-0 w-8 h-8 -left-4"
            />
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="opacity-0 w-8 h-8 -right-4"
            />
        </div>
    );
}
