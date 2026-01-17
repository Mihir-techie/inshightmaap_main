import { motion } from "framer-motion";
import { TopicNode } from "@/hooks/useAnalyzeContent";

interface MindMapVisualizationProps {
  topicTree: TopicNode[];
}

export const MindMapVisualization = ({ topicTree }: MindMapVisualizationProps) => {
  // Convert tree structure to graph layout
  const buildGraphLayout = (nodes: TopicNode[], depth = 0, parentX = 400, parentY = 80): any[] => {
    const layout: any[] = [];
    
    if (depth === 0) {
      // Root nodes
      const spacing = 600 / (nodes.length + 1);
      nodes.forEach((node, idx) => {
        const x = spacing * (idx + 1);
        const y = 80;
        layout.push({
          id: node.id,
          label: node.label,
          x,
          y,
          level: 0,
          children: node.children || [],
        });
        
        // Add children recursively
        if (node.children) {
          layout.push(...buildGraphLayout(node.children, 1, x, y));
        }
      });
    } else if (depth === 1) {
      // Second level
      const spacing = 300 / (nodes.length + 1);
      nodes.forEach((node, idx) => {
        const x = parentX + (spacing * (idx + 1) - 150);
        const y = 200;
        layout.push({
          id: node.id,
          label: node.label,
          x,
          y,
          level: 1,
          parentId: parentX,
          children: node.children || [],
        });
        
        // Add children recursively
        if (node.children) {
          layout.push(...buildGraphLayout(node.children, 2, x, y));
        }
      });
    } else {
      // Third level and beyond
      const spacing = 200 / (nodes.length + 1);
      nodes.forEach((node, idx) => {
        const x = parentX + (spacing * (idx + 1) - 100);
        const y = 320;
        layout.push({
          id: node.id,
          label: node.label,
          x,
          y,
          level: 2,
          parentId: parentX,
        });
      });
    }
    
    return layout;
  };

  const graphNodes = buildGraphLayout(topicTree);

  return (
    <div className="relative h-[600px] bg-gradient-to-br from-muted/50 via-background to-muted/30 rounded-xl overflow-hidden border border-border shadow-lg">
      {/* Background gradient effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <svg className="w-full h-full relative z-10" viewBox="0 0 800 600">
        {/* Animated gradient definitions */}
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Draw connections with gradient and glow */}
        {graphNodes
          .filter((node) => node.level > 0)
          .map((node, idx) => {
            const parent = graphNodes.find((n) => 
              (n.id === node.id?.split("-")[0] && n.level === node.level - 1) ||
              (n.level === node.level - 1 && Math.abs(n.x - (node.parentId || 0)) < 100)
            );
            if (parent) {
              return (
                <motion.g key={`line-group-${node.id}`}>
                  {/* Glow line */}
                  <motion.line
                    key={`line-glow-${node.id}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.3 + idx * 0.1 }}
                    x1={parent.x}
                    y1={parent.y}
                    x2={node.x}
                    y2={node.y}
                    stroke="url(#connectionGradient)"
                    strokeWidth="6"
                    filter="url(#glow)"
                  />
                  {/* Main line */}
                  <motion.line
                    key={`line-${node.id}`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                    x1={parent.x}
                    y1={parent.y}
                    x2={node.x}
                    y2={node.y}
                    className="stroke-accent/60 dark:stroke-accent/80"
                    strokeWidth="2.5"
                  />
                </motion.g>
              );
            }
            return null;
          })}

        {/* Draw nodes with enhanced visuals */}
        {graphNodes.map((node, idx) => {
          const radius = node.level === 0 ? 50 : node.level === 1 ? 38 : 30;
          const gradientId = node.level === 0 ? "primaryGradient" : "accentGradient";
          const textClass = node.level === 0 ? "fill-primary-foreground" : node.level === 1 ? "fill-accent-foreground" : "fill-secondary-foreground";
          const fontSize = node.level === 0 ? "text-sm" : node.level === 1 ? "text-xs" : "text-[10px]";
          
          return (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + idx * 0.08,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: 1.15 }}
              className="cursor-pointer"
            >
              {/* Outer glow circle */}
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={radius + 5} 
                className="fill-primary/10 dark:fill-accent/20"
                opacity="0.5"
              />
              {/* Main circle with gradient */}
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={radius} 
                fill={`url(#${gradientId})`}
                filter="url(#glow)"
                className="drop-shadow-lg"
              />
              {/* Inner highlight */}
              <circle 
                cx={node.x - 8} 
                cy={node.y - 8} 
                r={radius * 0.4} 
                className="fill-white/30"
              />
              {/* Node label */}
              <text
                x={node.x}
                y={node.y + (node.level === 0 ? 5 : 4)}
                textAnchor="middle"
                className={`${textClass} ${fontSize} font-semibold pointer-events-none`}
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
              >
                {node.label.length > 20 ? node.label.substring(0, 17) + "..." : node.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};
