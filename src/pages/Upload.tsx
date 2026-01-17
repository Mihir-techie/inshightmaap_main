import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useAnalyzeContent } from "@/hooks/useAnalyzeContent";
import {
  FileText,
  Upload as UploadIcon,
  Mic,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Loader2,
  Brain,
  Wand2,
} from "lucide-react";

type InputMethod = "text" | "pdf" | "audio";

const UploadPage = () => {
  const navigate = useNavigate();
  const [activeMethod, setActiveMethod] = useState<InputMethod>("text");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { analyze, isAnalyzing } = useAnalyzeContent();

  const inputMethods = [
    { id: "text" as InputMethod, icon: FileText, label: "Paste Text", description: "Copy & paste your content" },
    { id: "pdf" as InputMethod, icon: UploadIcon, label: "Upload PDF", description: "Upload document files" },
    { id: "audio" as InputMethod, icon: Mic, label: "Audio", description: "Voice recordings (coming soon)" },
  ];

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    try {
      const result = await analyze(textContent, "text");
      // Store result in sessionStorage and navigate
      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      navigate("/results");
    } catch (err) {
      // Error is already handled by the hook with a toast
      console.error("Analysis failed:", err);
    }
  };

  const canAnalyze = activeMethod === "text" ? textContent.length > 50 : file !== null;

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <ParticleBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header with unique animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-hero mb-6 shadow-glow"
            >
              <Brain className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Feed Your Content
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI will digest your text and create a beautiful, structured knowledge map.
            </p>
          </motion.div>

          {/* Input Method Selector with glow effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex gap-2 p-2 bg-card dark:bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-card">
              {inputMethods.map((method) => (
                <motion.button
                  key={method.id}
                  onClick={() => method.id !== "audio" && setActiveMethod(method.id)}
                  disabled={method.id === "audio"}
                  whileHover={{ scale: method.id !== "audio" ? 1.02 : 1 }}
                  whileTap={{ scale: method.id !== "audio" ? 0.98 : 1 }}
                  className={`relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all overflow-hidden ${
                    activeMethod === method.id
                      ? "bg-gradient-to-r from-primary to-primary/80 dark:from-accent dark:to-accent/80 text-primary-foreground dark:text-accent-foreground shadow-lg"
                      : method.id === "audio"
                      ? "text-muted-foreground/50 cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {activeMethod === method.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 dark:from-accent dark:to-accent/80 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <method.icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{method.label}</div>
                    <div className={`text-xs ${activeMethod === method.id ? "text-primary-foreground/70 dark:text-accent-foreground/70" : "text-muted-foreground"}`}>
                      {method.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <AnimatePresence mode="wait">
              {activeMethod === "text" && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste your lecture notes, article, or any text content here... (minimum 50 characters)"
                    className="relative w-full h-80 p-6 bg-card rounded-2xl border border-border shadow-card resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder:text-muted-foreground font-body transition-all"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-3">
                    <motion.div
                      animate={{ 
                        color: textContent.length > 50 ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))"
                      }}
                      className="text-sm font-medium"
                    >
                      {textContent.length} / 50+ characters
                    </motion.div>
                    {textContent.length > 50 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-accent"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeMethod === "pdf" && (
                <motion.div
                  key="pdf"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    className={`relative h-80 rounded-2xl border-2 border-dashed transition-all flex items-center justify-center ${
                      isDragging
                        ? "border-accent bg-accent/10 scale-[1.02]"
                        : file
                        ? "border-accent bg-accent/5"
                        : "border-border bg-card hover:border-accent/50 hover:bg-muted/30"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    <AnimatePresence mode="wait">
                      {file ? (
                        <motion.div
                          key="file-info"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="text-center"
                        >
                          <motion.div 
                            initial={{ rotate: 0 }}
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/20 flex items-center justify-center"
                          >
                            <CheckCircle2 className="w-8 h-8 text-accent" />
                          </motion.div>
                          <p className="font-medium text-foreground mb-1">{file.name}</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                            }}
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Remove file
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="upload-prompt"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="text-center"
                        >
                          <motion.div
                            animate={{ y: isDragging ? -10 : 0, scale: isDragging ? 1.1 : 1 }}
                            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center"
                          >
                            <UploadIcon className="w-8 h-8 text-muted-foreground" />
                          </motion.div>
                          <p className="font-medium text-foreground mb-1">
                            {isDragging ? "Drop your PDF here" : "Drag & drop your PDF"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            or click to browse files
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Analyze Button with magic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="relative inline-block">
              {canAnalyze && !isAnalyzing && (
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-xl blur-md opacity-50"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <Button
                variant="hero"
                size="xl"
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing}
                className="relative group min-w-64"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-5 h-5" />
                    </motion.div>
                    <span className="ml-2">Analyzing with AI...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Learning Map
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>

            {!canAnalyze && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-muted-foreground"
              >
                {activeMethod === "text"
                  ? "Please enter at least 50 characters to analyze"
                  : "Please upload a PDF file to analyze"}
              </motion.p>
            )}
          </motion.div>

          {/* Tips with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: Sparkles, title: "AI-Powered", tip: "Advanced NLP extracts key concepts" },
              { icon: Brain, title: "Deep Analysis", tip: "Discovers hidden topic relationships" },
              { icon: CheckCircle2, title: "Privacy First", tip: "Your data is processed securely" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -4, scale: 1.02 }}
                className="text-center p-6 bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 hover:border-accent/30 transition-colors cursor-default"
              >
                <item.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h4 className="font-display font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.tip}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPage;
