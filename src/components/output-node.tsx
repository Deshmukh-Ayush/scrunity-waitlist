import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import Image from "next/image";

export type OutputNodeData = {
    type: "text" | "card" | "pdfOutline" | "mindmap";
    text?: string;
};
export type OutputNodeType = Node<OutputNodeData, "outputNode">;

export function OutputNode({ data, isConnectable }: NodeProps<OutputNodeType>) {
    // 1. Text Variant (Top right: "Researching some epic shit")
    if (data.type === "text") {
        return (
            <div className="relative border-[1.5px] border-neutral-300 bg-white rounded-md px-6 py-4 shadow-[2px_2px_0px_rgba(0,0,0,0.05)] w-[300px] text-center">
                <span className="text-neutral-800 text-[13px] font-medium tracking-tight">
                    {data.text}
                </span>
                <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="opacity-0" />
            </div>
        );
    }

    // 2. Card Variant (Middle right: "Generating random paragraphs...")
    if (data.type === "card") {
        return (
            <div className="relative border-[2px] border-neutral-800 bg-white rounded-2xl p-6 shadow-[0px_8px_0px_#1f2937] w-[340px]">
                <p className="text-[12px] text-neutral-800 font-medium leading-relaxed">
                    {data.text}
                </p>
                <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="opacity-0" />
                <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0" />
            </div>
        );
    }

    // 3. PDF Outline Box (Bottom right left)
    if (data.type === "pdfOutline") {
        return (
            <div className="relative border-[2px] border-neutral-800 bg-white rounded-3xl p-6 shadow-[0px_8px_0px_#1f2937] w-[200px] h-[200px] flex items-center justify-center">
                <div className="border border-neutral-300 rounded-xl w-full h-full p-4 flex items-center justify-center bg-neutral-50 shadow-inner">
                    {/* Inner representation of the PDF tile */}
                    <div className="w-[100px] h-[100px] relative">
                        <Image src="/space-scrunity.svg" alt="PDF tile base" fill className="object-cover scale-150 rotate-[-15deg] translate-y-2" />
                        <div className="absolute inset-0 flex items-center justify-center -translate-y-2">
                            <div className="text-white bg-[#E93B3B] font-bold text-[8px] transform -rotate-45 px-1 rounded-sm tracking-tighter shadow-sm w-8 text-center skew-x-12 skew-y-12 shrink-0">
                                PDF
                            </div>
                        </div>
                    </div>
                </div>
                <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0" />
            </div>
        );
    }

    // 4. Mindmap Image Box (Bottom right right)
    if (data.type === "mindmap") {
        return (
            <div className="relative border-[2px] border-neutral-800 bg-[#E0DDD1] rounded-2xl shadow-[0px_8px_0px_#1f2937] w-[220px] h-[220px] overflow-hidden flex items-center justify-center">
                <div className="w-[90%] h-[90%] border border-neutral-400 bg-white opacity-90 rounded-md shadow flex flex-col items-center justify-center relative isolate p-2">
                    {/* Placeholder for the mindmap graphic */}
                    <div className="w-6 h-4 bg-neutral-200 border border-neutral-300 rounded-sm mb-4" />
                    <div className="flex gap-2">
                        <div className="w-4 h-3 bg-neutral-200 border border-neutral-300 rounded-sm" />
                        <div className="w-4 h-3 bg-neutral-200 border border-neutral-300 rounded-sm" />
                        <div className="w-4 h-3 bg-neutral-200 border border-neutral-300 rounded-sm" />
                    </div>
                </div>
                <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0" />
            </div>
        );
    }

    return null;
}
