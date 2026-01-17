import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LearningMapTree, SummaryCard } from "@/components/LearningMapTree";
import { RevisionView } from "@/components/RevisionView";
import { FocusScoreHeatmap } from "@/components/FocusScoreHeatmap";
import { MindMapVisualization } from "@/components/MindMapVisualization";
import { ParticleBackground } from "@/components/ParticleBackground";
import { AnalysisResult } from "@/hooks/useAnalyzeContent";
import { toast } from "sonner";
import {
  Download,
  Share2,
  ArrowLeft,
  Maximize2,
  Grid3X3,
  List,
  Sparkles,
  Loader2,
  BookOpen,
  TrendingUp,
} from "lucide-react";

// Fallback mock data
const mockSummary = `This analysis covers the fundamentals of Machine Learning, exploring how computers learn from data without explicit programming. The content delves into supervised and unsupervised learning paradigms, neural network architectures, and practical applications in image recognition and natural language processing.`;

const mockTopics = [
  "Machine Learning",
  "Neural Networks",
  "Supervised Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
];

const mockTreeData = [
  {
    id: "1",
    label: "Machine Learning Fundamentals",
    children: [
      {
        id: "1-1",
        label: "Supervised Learning",
        children: [
          { id: "1-1-1", label: "Classification" },
          { id: "1-1-2", label: "Regression" },
          { id: "1-1-3", label: "Decision Trees" },
        ],
      },
      {
        id: "1-2",
        label: "Unsupervised Learning",
        children: [
          { id: "1-2-1", label: "Clustering" },
          { id: "1-2-2", label: "Dimensionality Reduction" },
        ],
      },
      {
        id: "1-3",
        label: "Reinforcement Learning",
        children: [
          { id: "1-3-1", label: "Q-Learning" },
          { id: "1-3-2", label: "Policy Gradients" },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Neural Networks",
    children: [
      {
        id: "2-1",
        label: "Architecture",
        children: [
          { id: "2-1-1", label: "Layers & Neurons" },
          { id: "2-1-2", label: "Activation Functions" },
          { id: "2-1-3", label: "Backpropagation" },
        ],
      },
      {
        id: "2-2",
        label: "Deep Learning",
        children: [
          { id: "2-2-1", label: "CNN" },
          { id: "2-2-2", label: "RNN" },
          { id: "2-2-3", label: "Transformers" },
        ],
      },
    ],
  },
  {
    id: "3",
    label: "Applications",
    children: [
      { id: "3-1", label: "Computer Vision" },
      { id: "3-2", label: "Natural Language Processing" },
      { id: "3-3", label: "Recommendation Systems" },
    ],
  },
];

type ViewMode = "tree" | "graph" | "revision" | "heatmap";

// Flask backend URL - use environment variable or default to localhost
const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL || "http://localhost:5000";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("tree");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("analysisResult");
    if (stored) {
      try {
        setAnalysisResult(JSON.parse(stored));
      } catch {
        // Use mock data if parsing fails
      }
    }
  }, []);

  const summary = analysisResult?.summary || mockSummary;
  const keyTopics = analysisResult?.keyTopics || mockTopics;
  const topicTree = analysisResult?.topicTree || mockTreeData;
  const revisionView = analysisResult?.revisionView;
  const focusScores = analysisResult?.focusScores || [];

  // Generate mock revision view if not available
  const mockRevisionView = {
    keyPoints: keyTopics.map((topic, idx) => ({
      topic,
      explanation: `Key concept: ${topic}. Important foundational knowledge for understanding the broader context.`,
      thingsToRemember: topicTree[idx]?.children?.slice(0, 3).map((c: any) => c.label) || [],
    })),
  };

  // Generate mock focus scores if not available
  const mockFocusScores = keyTopics.map((topic, idx) => ({
    topic,
    score: 0.9 - (idx * 0.1),
    density: idx < 3 ? ("high" as const) : idx < 5 ? ("medium" as const) : ("low" as const),
  }));

  const displayRevisionView = revisionView || mockRevisionView;
  const displayFocusScores = focusScores.length > 0 ? focusScores : mockFocusScores;

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Prepare analysis data for PDF generation
      const pdfData = {
        summary,
        keyTopics,
        topicTree,
        revisionView: displayRevisionView,
        focusScores: displayFocusScores,
      };

      const response = await fetch(`${FLASK_API_URL}/api/generate-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pdfData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `Failed to generate PDF: ${response.status}`);
      }

      // Get PDF blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "learning_map_analysis.pdf";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!", {
        description: "Your learning map has been saved.",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to generate PDF. Please ensure the Flask backend is running.";
      toast.error("PDF generation failed", {
        description: errorMessage,
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <ParticleBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          >
            <div>
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to upload
              </Link>
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-glow"
                >
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <div>
                  <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                    Your Learning Map
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    AI-generated knowledge structure
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View toggle */}
              <div className="flex items-center gap-1 p-1 bg-muted rounded-lg flex-wrap">
                <button
                  onClick={() => setViewMode("tree")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "tree"
                      ? "bg-card shadow-soft text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Tree View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("graph")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "graph"
                      ? "bg-card shadow-soft text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Graph View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("revision")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "revision"
                      ? "bg-card shadow-soft text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Revision View"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("heatmap")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "heatmap"
                      ? "bg-card shadow-soft text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Focus Score Heatmap"
                >
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="heroDark" size="sm" onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
                {isGeneratingPDF ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                <Download className="w-4 h-4" />
                )}
                Export
              </Button>
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <SummaryCard summary={summary} keyTopics={keyTopics} />
            </motion.div>

            {/* Right: Learning Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {viewMode === "tree" ? (
                <LearningMapTree data={topicTree} />
              ) : viewMode === "revision" ? (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-card min-h-[500px]">
                  <RevisionView keyPoints={displayRevisionView.keyPoints} />
                </div>
              ) : viewMode === "heatmap" ? (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-card min-h-[500px]">
                  <FocusScoreHeatmap focusScores={displayFocusScores} />
                </div>
              ) : (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-card min-h-[500px]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                        Visual Knowledge Graph
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Interactive mind map visualization
                      </p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <Maximize2 className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Connected Mind Map visualization */}
                  <MindMapVisualization topicTree={topicTree} />
                </div>
              )}
            </motion.div>
          </div>

          {/* Action bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/upload">
              <Button variant="outline" size="lg">
                Analyze Another Document
              </Button>
            </Link>
            <Button
              variant="hero"
              size="lg"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-5 h-5" />
                  </motion.div>
                  <span className="ml-2">Generating PDF...</span>
                </>
              ) : (
                <>
              <Download className="w-5 h-5" />
              Download as PDF
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultsPage;
