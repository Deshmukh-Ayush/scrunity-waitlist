import { useState, useCallback } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addEmailToWaitlist } from "@/lib/appwrite";
import { Loader2, Check } from "lucide-react";

export type WaitlistNodeData = { title?: string };
export type WaitlistNodeType = Node<WaitlistNodeData, "waitlist">;

export function WaitlistNode({ data, isConnectable, selected }: NodeProps<WaitlistNodeType>) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await addEmailToWaitlist(email);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }, [email]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-[320px] bg-white rounded-xl border transition-all duration-300 ${
        selected ? "border-neutral-400 shadow-sm" : "border-neutral-200"
      }`}
    >
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2 h-2 bg-neutral-300 border-none" />
      
      <div className="p-6">
        <h3 className="text-sm font-medium text-neutral-800 mb-2">
          {data.title || "Join the Scrunity waitlist"}
        </h3>
        <p className="text-xs text-neutral-500 mb-4">
          Get early access to the AI-powered collaborative canvas.
        </p>

        {status === "success" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 p-3 rounded-md border border-neutral-100"
          >
            <Check className="w-4 h-4" /> You are on the list.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 nodrag">
            <Input 
              type="email" 
              placeholder="emil@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="h-9 text-xs focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300"
            />
            <Button 
              type="submit" 
              disabled={status === "loading" || !email}
              className="h-9 px-4 text-xs bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
            >
              {status === "loading" ? <Loader2 className="w-3 h-3 animate-spin" /> : "Join"}
            </Button>
          </form>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2 h-2 bg-neutral-300 border-none" />
    </motion.div>
  );
}