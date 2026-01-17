import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Download,
  FileText,
  Search,
  Trash2,
  Video,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface TranscriptSummary {
  id: string;
  title: string;
  date: string;
  duration: string;
  summary: string;
  keyTopics: string[];
  transcriptType: "zoom" | "meet" | "manual";
  analysisResult?: any;
}

const DashboardPage = () => {
  const [transcripts, setTranscripts] = useState<TranscriptSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlan, setCurrentPlan] = useState("free");

  useEffect(() => {
    // Load transcripts from localStorage
    const savedTranscripts = localStorage.getItem("transcriptSummaries");
    if (savedTranscripts) {
      try {
        setTranscripts(JSON.parse(savedTranscripts));
      } catch (e) {
        console.error("Failed to load transcripts:", e);
      }
    }

    // Load current plan
    const plan = localStorage.getItem("currentPlan") || "free";
    setCurrentPlan(plan);
  }, []);

  const filteredTranscripts = transcripts.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const updated = transcripts.filter((t) => t.id !== id);
    setTranscripts(updated);
    localStorage.setItem("transcriptSummaries", JSON.stringify(updated));
    toast.success("Transcript deleted");
  };

  const handleViewDetails = (transcript: TranscriptSummary) => {
    if (transcript.analysisResult) {
      sessionStorage.setItem("analysisResult", JSON.stringify(transcript.analysisResult));
      window.location.href = "/results";
    }
  };

  const getUsageStats = () => {
    const planLimits: Record<string, { used: number; limit: number; unit: string }> = {
      free: { used: 0, limit: 10, unit: "minutes" },
      student: { used: 0, limit: 60, unit: "minutes" },
      pro: { used: 0, limit: 300, unit: "minutes" },
      team: { used: 0, limit: Infinity, unit: "unlimited" },
    };

    const totalMinutes = transcripts.reduce((acc, t) => {
      const duration = parseInt(t.duration) || 0;
      return acc + duration;
    }, 0);

    const plan = planLimits[currentPlan] || planLimits.free;
    return { ...plan, used: totalMinutes };
  };

  const usage = getUsageStats();

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
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                View and manage your transcript summaries
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/upload">
                <Button variant="hero" size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  New Analysis
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Usage Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current Plan</span>
                <span className="text-xs font-semibold text-accent capitalize">{currentPlan}</span>
              </div>
              <p className="text-2xl font-bold text-foreground capitalize">{currentPlan}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Transcripts</span>
                <FileText className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{transcripts.length}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Usage</span>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {usage.used} / {usage.limit === Infinity ? "∞" : usage.limit} {usage.unit}
              </p>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search transcripts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Transcripts List */}
          {filteredTranscripts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-2xl border border-border p-12 text-center"
            >
              <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                No transcripts yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start by analyzing text or uploading a PDF, or use our browser extension for Zoom/Google Meet transcripts.
              </p>
              <Link to="/upload">
                <Button variant="hero" size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Analysis
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {filteredTranscripts.map((transcript, index) => (
                <motion.div
                  key={transcript.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                          {transcript.transcriptType === "zoom" || transcript.transcriptType === "meet" ? (
                            <Video className="w-5 h-5 text-accent" />
                          ) : (
                            <FileText className="w-5 h-5 text-accent" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-lg text-foreground">
                            {transcript.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(transcript.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {transcript.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3 line-clamp-2">{transcript.summary}</p>
                      {transcript.keyTopics && transcript.keyTopics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {transcript.keyTopics.slice(0, 5).map((topic, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-muted rounded-md text-foreground"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(transcript)}
                        disabled={!transcript.analysisResult}
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(transcript.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
