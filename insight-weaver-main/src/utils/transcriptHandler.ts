import { toast } from "sonner";

const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL || "http://localhost:5000";

export interface TranscriptData {
  transcript: string;
  title: string;
  duration?: number;
  source?: "zoom" | "meet" | "manual";
}

export const processTranscript = async (data: TranscriptData) => {
  try {
    const response = await fetch(`${FLASK_API_URL}/api/process-transcript`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transcript: data.transcript,
        title: data.title || "Meeting Transcript",
        duration: data.duration || 0,
        source: data.source || "manual",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Failed to process transcript" }));
      throw new Error(errorData.error || `Failed to process transcript: ${response.status}`);
    }

    const result = await response.json();
    
    // Save to localStorage for dashboard
    const transcripts = JSON.parse(localStorage.getItem("transcriptSummaries") || "[]");
    transcripts.push(result.transcriptSummary);
    localStorage.setItem("transcriptSummaries", JSON.stringify(transcripts));
    
    // Store analysis result for viewing
    if (result.transcriptSummary.analysisResult) {
      sessionStorage.setItem("analysisResult", JSON.stringify(result.transcriptSummary.analysisResult));
    }
    
    toast.success("Transcript processed successfully!", {
      description: "Summary and learning map generated",
    });
    
    return result.transcriptSummary;
  } catch (error) {
    console.error("Transcript processing error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process transcript";
    toast.error("Transcript processing failed", {
      description: errorMessage,
    });
    throw error;
  }
};
