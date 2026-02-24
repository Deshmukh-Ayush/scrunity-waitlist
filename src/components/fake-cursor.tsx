import { motion } from "motion/react";
import { MousePointer2 } from "lucide-react";

interface FakeCursorProps {
    x: number;
    y: number;
    color: string;
    name: string;
    delay?: number;
}

export function FakeCursor({ x, y, color, name, delay = 0 }: FakeCursorProps) {
    return (
        <motion.div
            className="absolute pointer-events-none z-50 flex flex-col items-start"
            animate={{ x, y }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                mass: 0.8,
                delay,
            }}
        >
            <MousePointer2
                className="w-5 h-5 -ml-1 -mt-1 drop-shadow-md"
                style={{ color, fill: color }}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.2 }}
                className="px-2 py-1 mt-1 rounded-full text-[10px] font-bold text-white shadow-xl whitespace-nowrap tracking-wide"
                style={{ backgroundColor: color }}
            >
                {name}
            </motion.div>
        </motion.div>
    );
}
