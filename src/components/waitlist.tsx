import { useState, useCallback } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addEmailToWaitlist } from "@/lib/appwrite";
import { Loader2, Check } from "lucide-react";

export type WaitlistNodeData = {
  title?: string;
  onSuccess?: () => void;
};
export type WaitlistNodeType = Node<WaitlistNodeData, "waitlist">;

export function WaitlistNode({ data, isConnectable, selected }: NodeProps<WaitlistNodeType>) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await addEmailToWaitlist(email);
      setStatus("success");
      if (data.onSuccess) {
        data.onSuccess();
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }, [email, data]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`w-[340px] bg-white border rounded-2xl shadow-xl transition-all duration-300 overflow-hidden ${selected || isFocused ? "border-blue-500 ring-4 ring-blue-500/10 shadow-blue-500/10" : "border-neutral-200"
        }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-white border-2 border-neutral-300 -left-1.5 transition-colors hover:border-blue-500 hover:bg-blue-50"
      />

      {/* Factory Branding Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            S
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">
            Scrunity Factory
          </h3>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-neutral-200 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-neutral-200 animate-pulse delay-75" />
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-150 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        </div>
      </div>

      <div className="p-6">
        <p className="text-[13px] text-neutral-500 mb-6 leading-relaxed font-normal">
          Toss your scattered thoughts, PDFs, and links in. Get a beautifully structured spatial canvas out. Request early access below.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center gap-3 text-sm text-emerald-700 p-4 bg-emerald-50 rounded-xl border border-emerald-100 shadow-inner"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Check className="w-4 h-4" />
              </div>
              <span className="font-medium">You&apos;re in the queue.</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 nodrag"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={status === "loading"}
                className="h-11 bg-white border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 
                           focus-visible:ring-0 focus-visible:border-blue-500 rounded-xl transition-all shadow-sm"
              />
              <Button
                type="submit"
                disabled={status === "loading" || !email}
                className="h-11 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Process Details"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-white border-2 border-neutral-300 -right-1.5 transition-colors hover:border-blue-500 hover:bg-blue-50"
      />
    </motion.div>
  );
}