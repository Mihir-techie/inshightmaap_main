import { motion } from "framer-motion";
import { RevisionPoint } from "@/hooks/useAnalyzeContent";
import { BookOpen, CheckCircle2, Lightbulb } from "lucide-react";

interface RevisionViewProps {
  keyPoints: RevisionPoint[];
}

export const RevisionView = ({ keyPoints }: RevisionViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700 flex items-center justify-center shadow-lg">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Revision Mode</h2>
          <p className="text-sm text-muted-foreground">Exam-ready key points and explanations</p>
        </div>
      </div>

      <div className="grid gap-4">
        {keyPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                <span className="text-sm font-semibold text-accent">{index + 1}</span>
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  {point.topic}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{point.explanation}</p>
                
                {point.thingsToRemember && point.thingsToRemember.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Things to Remember:
                    </p>
                    <ul className="space-y-1 ml-6">
                      {point.thingsToRemember.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
