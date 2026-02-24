import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import Image from "next/image";
import { ReactNode } from "react";
import { FileText, Image as ImageIcon, Video } from "lucide-react";

export type IsometricNodeData = {
    type: "pdf" | "image" | "video";
};
export type IsometricNodeType = Node<IsometricNodeData, "isometricNode">;

// PDF Icon exactly as requested: rounded rect with "PDF" text (since we don't have the explicit exact inner SVG, we replicate it)
const PdfIcon = () => (
    <div className="flex items-center justify-center w-8 h-8 bg-[#E93B3B] rounded-sm shadow-sm rotate-45 transform skew-x-12 skew-y-12">
        <span className="text-white font-bold text-[8px] -rotate-45 block">PDF</span>
    </div>
);

// We apply a consistent isometric transform to icons layered over the base asset
const IsometricIconWrapper = ({ children }: { children: ReactNode }) => (
    <div className="absolute inset-0 flex items-center justify-center -translate-y-1">
        <div className="w-10 h-10 bg-white shadow-sm border-2 border-black rounded-xl overflow-hidden flex items-center justify-center transform 
      scale-y-75 -rotate-45"
        >
            {/* We un-rotate inside to place the icon flat relative to the box */}
            <div className="rotate-45">
                {children}
            </div>
        </div>
    </div>
);

const iconMap: Record<IsometricNodeData["type"], ReactNode> = {
    pdf: <div className="text-[#E93B3B] font-bold text-[10px] tracking-tighter">PDF</div>,
    image: <ImageIcon className="w-5 h-5 text-black" strokeWidth={2.5} />,
    video: <Video className="w-5 h-5 text-black" strokeWidth={2.5} />,
};

export function IsometricNode({ data, isConnectable }: NodeProps<IsometricNodeType>) {
    return (
        <div className="relative w-[120px] h-[80px] group drop-shadow-sm transition-transform hover:-translate-y-1">
            {/* Base SVG Asset provided by User */}
            <Image
                src="/space-scrunity.svg"
                alt="Isometric Base"
                fill
                style={{ objectFit: 'contain' }}
                priority
            />

            {/* Floating Icon perfectly aligned with the isometric plane */}
            <IsometricIconWrapper>
                {iconMap[data.type]}
            </IsometricIconWrapper>

            {/* Handles */}
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="opacity-0 w-4 h-4"
            />
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                className="opacity-0 w-4 h-4"
            />
        </div>
    );
}
