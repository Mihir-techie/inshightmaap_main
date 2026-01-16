import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface TopicNode {
  id: string;
  label: string;
  children?: TopicNode[];
}

export interface AnalysisResult {
  summary: string;
  keyTopics: string[];
  topicTree: TopicNode[];
}

// Flask backend URL - use environment variable or default to localhost
const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL || "http://localhost:5000";

export const useAnalyzeContent = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (content: string, type: "text" | "pdf" = "text") => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    // Try Flask backend first
    try {
      const flaskResponse = await fetch(`${FLASK_API_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, type }),
      });

      if (flaskResponse.ok) {
        const data = await flaskResponse.json();

        if (data?.error) {
          throw new Error(data.error);
        }

        if (!data?.summary || !data?.topicTree) {
          throw new Error("Invalid response from Flask backend");
        }

        setResult(data);
        toast.success("Analysis complete!", {
          description: `Found ${data.keyTopics?.length || 0} key topics`,
        });

        return data;
      } else {
        throw new Error(`Flask backend returned status ${flaskResponse.status}`);
      }
    } catch (flaskErr) {
      console.warn("Flask backend failed, trying Supabase fallback:", flaskErr);

      // Fallback to Supabase Edge Function
      try {
        const { data, error: fnError } = await supabase.functions.invoke("analyze-content", {
          body: { content, type },
        });

        if (fnError) {
          console.error("Supabase function error:", fnError);
          throw new Error(fnError.message || "Failed to analyze content");
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        if (!data?.summary || !data?.topicTree) {
          throw new Error("Invalid response from analysis");
        }

        setResult(data);
        toast.success("Analysis complete! (via Supabase)", {
          description: `Found ${data.keyTopics?.length || 0} key topics`,
        });

        return data;
      } catch (supabaseErr) {
        const message =
          supabaseErr instanceof Error
            ? supabaseErr.message
            : "Failed to analyze content with both backends";
        setError(message);
        toast.error("Analysis failed", {
          description: "Both Flask and Supabase backends failed. Please check your configuration.",
        });
        throw supabaseErr;
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    analyze,
    reset,
    isAnalyzing,
    result,
    error,
  };
};
