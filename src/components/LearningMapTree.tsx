import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface TopicNode {
  id: string;
  label: string;
  children?: TopicNode[];
}

interface LearningMapTreeProps {
  data: TopicNode[];
}

const TreeNode = ({ node, depth = 0 }: { node: TopicNode; depth?: number }) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: depth * 0.1 }}
      className="select-none"
    >
      <motion.div
        whileHover={{ x: 4, backgroundColor: "hsl(var(--accent) / 0.1)" }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
          hasChildren ? "hover:bg-accent/10" : ""
        }`}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
      >
        {hasChildren ? (
          <motion.div
            animate={{ rotate: isExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5 flex items-center justify-center text-muted-foreground"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        ) : (
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
        )}
        <span
          className={`font-medium ${
            depth === 0 ? "text-lg text-foreground" : depth === 1 ? "text-base text-foreground/90" : "text-sm text-foreground/80"
          }`}
        >
          {node.label}
        </span>
        {hasChildren && (
          <span className="text-xs text-muted-foreground ml-2">
            ({node.children!.length})
          </span>
        )}
      </motion.div>

      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative">
              {/* Connection line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-px bg-border"
                style={{ left: `${depth * 24 + 22}px` }}
              />
              {node.children!.map((child) => (
                <TreeNode key={child.id} node={child} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const LearningMapTree = ({ data }: LearningMapTreeProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
      <div className="mb-6">
        <h3 className="font-display font-semibold text-xl text-foreground mb-2">
          Topic Hierarchy
        </h3>
        <p className="text-sm text-muted-foreground">
          Click on topics to expand and explore subtopics
        </p>
      </div>
      <div className="space-y-1">
        {data.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};

interface SummaryCardProps {
  summary: string;
  keyTopics: string[];
}

export const SummaryCard = ({ summary, keyTopics }: SummaryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-card"
    >
      <h3 className="font-display font-semibold text-xl text-foreground mb-4">
        Summary
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-6">
        {summary}
      </p>

      <div>
        <h4 className="font-medium text-foreground mb-3">Key Topics</h4>
        <div className="flex flex-wrap gap-2">
          {keyTopics.map((topic, index) => (
            <motion.span
              key={topic}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              {topic}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
