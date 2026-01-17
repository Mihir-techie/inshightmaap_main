import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingNodeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const FloatingNode = ({ children, delay = 0, className = "", size = "md" }: FloatingNodeProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={`${sizeClasses[size]} rounded-2xl shadow-card flex items-center justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
}

export const AnimatedConnection = ({ x1, y1, x2, y2, delay = 0 }: AnimatedConnectionProps) => {
  const pathLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className="node-line"
      strokeDasharray={pathLength}
      strokeDashoffset={pathLength}
      initial={{ strokeDashoffset: pathLength }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
    />
  );
};

export const KnowledgeGraphBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <AnimatedConnection x1={100} y1={100} x2={300} y2={200} delay={0.5} />
        <AnimatedConnection x1={300} y1={200} x2={500} y2={150} delay={0.8} />
        <AnimatedConnection x1={300} y1={200} x2={400} y2={350} delay={1.1} />
        <AnimatedConnection x1={500} y1={150} x2={700} y2={250} delay={1.4} />
        <AnimatedConnection x1={400} y1={350} x2={600} y2={400} delay={1.7} />
      </svg>

      {/* Floating nodes */}
      <motion.div
        className="absolute top-20 left-[10%] w-4 h-4 rounded-full bg-primary/20"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-accent/30"
        animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 left-[20%] w-3 h-3 rounded-full bg-primary/25"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-60 left-[30%] w-5 h-5 rounded-full bg-accent/20"
        animate={{ y: [0, -25, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute bottom-40 right-[25%] w-4 h-4 rounded-full bg-primary/30"
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
      />

      {/* Orbiting elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-3 h-3 rounded-full bg-accent/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px center" }}
        />
      </div>
    </div>
  );
};
