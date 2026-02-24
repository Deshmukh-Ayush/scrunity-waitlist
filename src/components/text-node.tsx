import { useCallback, ChangeEvent } from "react";
import { 
  Handle, 
  Position, 
  type NodeProps, 
  type Node 
} from "@xyflow/react";

type TextUpdaterData = {
  label?: string;
  value?: string;
};

export type TextUpdaterNode = Node<TextUpdaterData, 'textUpdater'>;

export function TextUpdaterNode({ data, isConnectable, selected }: NodeProps<TextUpdaterNode>) {
  
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className={`
      min-w-[150px] shadow-xl rounded-md bg-white border-2 transition-all
      ${selected ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-gray-200'}
    `}>
      {/* Target Handle (Top) */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-400 border-2 border-white"
      />
      
      {/* Node Header */}
      <div className="px-3 py-1.5 border-b border-gray-100 bg-gray-50/50 rounded-t-md">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {data.label || 'Text Input'}
        </p>
      </div>

      {/* Node Body */}
      <div className="p-3">
        <label htmlFor="text" className="block text-xs font-medium text-gray-700 mb-1">
          Content
        </label>
        <input 
          id="text" 
          name="text" 
          onChange={onChange} 
          className="nodrag w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Type something..."
          defaultValue={data.value}
        />
      </div>

      {/* Source Handle (Bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-600 border-2 border-white"
      />
    </div>
  );
}