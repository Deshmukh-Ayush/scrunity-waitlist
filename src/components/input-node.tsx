import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { FileText, Image as ImageIcon, Youtube } from "lucide-react";
import { ReactNode } from "react";

export type InputNodeData = {
    type: "pdf" | "image" | "youtube" | "text",
    label: string
};
export type InputNodeType = Node<InputNodeData, "inputNode">;

const iconMap: Record<InputNodeData["type"], ReactNode> = {
    pdf: <FileText className="w-5 h-5 text-red-500" />,
    image: <ImageIcon className="w-5 h-5 text-blue-500" />,
    youtube: <Youtube className="w-5 h-5 text-red-600" />,
    text: <FileText className="w-5 h-5 text-gray-500" />,
};

export function InputNode({ data, isConnectable }: NodeProps<InputNodeType>) {
    return (
        <div className="relative group flex flex-col items-center justify-center w-16 h-16 bg-white border border-neutral-200 rounded-xl shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
            {iconMap[data.type]}
            <span className="absolute -bottom-6 text-[10px] font-medium text-neutral-500 bg-white px-2 py-0.5 rounded-full border border-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity">
                {data.label}
            </span>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="opactiy-0 w-2 h-2 bg-neutral-300 border-none -right-1"
            />
        </div>
    );
}
