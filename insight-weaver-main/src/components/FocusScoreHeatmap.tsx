import { motion } from "framer-motion";
import { FocusScore } from "@/hooks/useAnalyzeContent";
import { TrendingUp, Zap, Activity } from "lucide-react";

interface FocusScoreHeatmapProps {
  focusScores: FocusScore[];
}

export const FocusScoreHeatmap = ({ focusScores }: FocusScoreHeatmapProps) => {
  // Sort by score descending
  const sortedScores = [...focusScores].sort((a, b) => b.score - a.score);

  const getScoreColor = (score: number, density: string) => {
    if (density === "high" || score >= 0.7) {
      return "bg-yellow-400 dark:bg-yellow-500 border-yellow-500 dark:border-yellow-600";
    } else if (density === "medium" || score >= 0.4) {
      return "bg-yellow-200 dark:bg-yellow-700 border-yellow-300 dark:border-yellow-600";
    } else {
      return "bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800";
    }
  };

  const getScoreIntensity = (score: number) => {
    return Math.round(score * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700 flex items-center justify-center shadow-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Focus Score Heatmap</h2>
          <p className="text-sm text-muted-foreground">Topic importance and discussion intensity</p>
        </div>
      </div>

      <div className="grid gap-3">
        {sortedScores.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-lg border-2 p-4 transition-all hover:shadow-md ${getScoreColor(item.score, item.density)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  {item.density === "high" && <Zap className="w-4 h-4 text-yellow-900 dark:text-yellow-100" />}
                  {item.density === "medium" && <Activity className="w-4 h-4 text-yellow-800 dark:text-yellow-200" />}
                  {item.density === "low" && <Activity className="w-4 h-4 text-yellow-700 dark:text-yellow-300" />}
                  <span className="font-semibold text-yellow-900 dark:text-yellow-100">{item.topic}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                    {getScoreIntensity(item.score)}%
                  </div>
                  <div className="text-xs text-yellow-800 dark:text-yellow-200 capitalize">
                    {item.density} density
                  </div>
                </div>
                <div className="w-16 h-2 bg-yellow-900/30 dark:bg-yellow-100/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score * 100}%` }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                    className="h-full bg-yellow-900 dark:bg-yellow-100"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-foreground">Legend</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-400 border border-yellow-500" />
            <span className="text-muted-foreground">High (≥70%) - Important</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-200 dark:bg-yellow-700 border border-yellow-300" />
            <span className="text-muted-foreground">Medium (40-69%) - Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-100 dark:bg-yellow-900 border border-yellow-200" />
            <span className="text-muted-foreground">Low (&lt;40%) - Less Relevant</span>
          </div>
        </div>
      </div>
    </div>
  );
};
