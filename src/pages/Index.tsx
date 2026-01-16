import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureCard, StepCard, StatCard } from "@/components/FeatureCard";
import { KnowledgeGraphBackground } from "@/components/KnowledgeGraph";
import {
  FileText,
  Brain,
  Network,
  Zap,
  BookOpen,
  Users,
  GraduationCap,
  ArrowRight,
  Upload,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <KnowledgeGraphBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Learning Maps
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight"
          >
            Turn Messy Lectures Into{" "}
            <span className="text-gradient">Structured Knowledge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Upload your notes, PDFs, or audio recordings. Our AI transforms them into 
            beautiful, structured learning maps you can actually understand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/upload">
              <Button variant="hero" size="xl" className="group">
                Start Mapping
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="xl">
                See How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Preview mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 gradient-hero opacity-10 blur-3xl rounded-3xl" />
            <div className="relative bg-card rounded-3xl shadow-elevated border border-border p-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-accent/50" />
                <div className="w-3 h-3 rounded-full bg-secondary" />
              </div>
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                <div className="w-full h-full p-8 flex items-center justify-center">
                  {/* Animated knowledge map preview */}
                  <svg className="w-full h-full max-w-2xl" viewBox="0 0 400 200">
                    {/* Central node */}
                    <motion.circle
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      cx="200" cy="100" r="25"
                      className="fill-primary"
                    />
                    <motion.text
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      x="200" y="105" textAnchor="middle"
                      className="fill-primary-foreground text-xs font-medium"
                    >
                      Main Topic
                    </motion.text>

                    {/* Connected nodes */}
                    {[
                      { x: 80, y: 60, label: "Concept A" },
                      { x: 320, y: 60, label: "Concept B" },
                      { x: 80, y: 140, label: "Concept C" },
                      { x: 320, y: 140, label: "Concept D" },
                    ].map((node, i) => (
                      <motion.g key={i}>
                        <motion.line
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
                          x1="200" y1="100"
                          x2={node.x} y2={node.y}
                          className="stroke-border"
                          strokeWidth="2"
                        />
                        <motion.circle
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.2 + i * 0.2, duration: 0.3 }}
                          cx={node.x} cy={node.y} r="18"
                          className="fill-accent"
                        />
                        <motion.text
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.4 + i * 0.2 }}
                          x={node.x} y={node.y + 4} textAnchor="middle"
                          className="fill-accent-foreground text-[8px] font-medium"
                        >
                          {node.label}
                        </motion.text>
                      </motion.g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Built for Learners Like You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're studying for exams, researching, or teaching - LearningMap adapts to your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={GraduationCap}
              title="Students"
              description="Turn lecture recordings and textbook chapters into visual study guides that stick."
              delay={0.1}
            />
            <FeatureCard
              icon={Users}
              title="Teams"
              description="Share structured knowledge maps with your team. Perfect for onboarding and documentation."
              delay={0.2}
            />
            <FeatureCard
              icon={BookOpen}
              title="Educators"
              description="Create engaging visual curricula and help students see the connections between concepts."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Powerful Features, Simple Interface
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to transform chaos into clarity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={FileText}
              title="Multiple Formats"
              description="Upload PDFs, paste text, or record audio - we handle it all."
              delay={0.1}
            />
            <FeatureCard
              icon={Brain}
              title="AI Analysis"
              description="Advanced NLP extracts key concepts and their relationships."
              delay={0.2}
            />
            <FeatureCard
              icon={Network}
              title="Visual Maps"
              description="See your knowledge as an interactive, expandable tree structure."
              delay={0.3}
            />
            <FeatureCard
              icon={Zap}
              title="Instant Results"
              description="Get your structured summary in seconds, not hours."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              How It Works
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              Three simple steps to transform your learning experience.
            </p>
          </motion.div>

          <div className="space-y-8">
            <StepCard
              number={1}
              title="Upload Your Content"
              description="Paste text, upload a PDF, or record audio. Our system accepts multiple formats to fit your workflow."
              delay={0.1}
            />
            <StepCard
              number={2}
              title="AI Analyzes & Structures"
              description="Our AI engine extracts key topics, identifies relationships, and creates a hierarchical knowledge structure."
              delay={0.2}
            />
            <StepCard
              number={3}
              title="Explore Your Learning Map"
              description="Navigate your visual knowledge map. Expand topics, see connections, and export for later study."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard value="10x" label="Faster Understanding" delay={0.1} />
            <StatCard value="85%" label="Better Retention" delay={0.2} />
            <StatCard value="1000+" label="Topics Mapped" delay={0.3} />
            <StatCard value="∞" label="Connections Made" delay={0.4} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start creating visual knowledge maps today. No signup required.
            </p>
            <Link to="/upload">
              <Button variant="hero" size="xl" className="group">
                <Upload className="w-5 h-5" />
                Upload Your First Content
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Free to use
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                No account needed
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Export anywhere
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
