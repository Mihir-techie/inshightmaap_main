import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Brain,
  Network,
  ArrowRight,
  Lightbulb,
  Layers,
  Target,
  Zap,
} from "lucide-react";

const AboutPage = () => {
  const steps = [
    {
      icon: Upload,
      title: "1. Input Your Content",
      description: "Paste text directly, upload PDF documents, or record audio. Our system accepts multiple formats to match your workflow.",
      details: [
        "Support for PDF, TXT, and plain text",
        "Audio transcription (coming soon)",
        "No size limits on uploads",
        "Secure, private processing",
      ],
    },
    {
      icon: Brain,
      title: "2. AI Analysis",
      description: "Our advanced NLP engine processes your content, identifying key concepts, relationships, and hierarchies.",
      details: [
        "Natural Language Processing",
        "Topic extraction & clustering",
        "Relationship mapping",
        "Importance ranking",
      ],
    },
    {
      icon: Network,
      title: "3. Structured Output",
      description: "Receive a beautifully organized knowledge map with expandable topics, summaries, and visual connections.",
      details: [
        "Interactive tree view",
        "Visual graph representation",
        "Key topic highlights",
        "Export to multiple formats",
      ],
    },
  ];

  const benefits = [
    {
      icon: Lightbulb,
      title: "Better Understanding",
      description: "Visual structures help your brain form stronger connections between concepts.",
    },
    {
      icon: Layers,
      title: "Organized Knowledge",
      description: "Turn chaotic notes into hierarchical, easy-to-navigate learning materials.",
    },
    {
      icon: Target,
      title: "Focused Learning",
      description: "Identify the most important topics and relationships at a glance.",
    },
    {
      icon: Zap,
      title: "Time Savings",
      description: "What takes hours of manual organization happens in seconds with AI.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
              How LearningMap Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform any content into structured, visual knowledge maps using the power of AI. 
              Here's the magic behind the scenes.
            </p>
          </motion.div>
        </section>

        {/* Process Steps */}
        <section className="max-w-5xl mx-auto px-6 mb-24">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 items-center`}
              >
                {/* Visual */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square max-w-md mx-auto"
                  >
                    <div className="absolute inset-0 gradient-hero opacity-10 rounded-3xl blur-2xl" />
                    <div className="relative bg-card rounded-3xl border border-border shadow-elevated h-full flex items-center justify-center p-8">
                      <div className="w-32 h-32 rounded-2xl gradient-hero flex items-center justify-center">
                        <step.icon className="w-16 h-16 text-primary-foreground" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-3 text-foreground"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-secondary/30 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                Why Visual Learning Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Research shows that visual representations improve comprehension and retention by up to 85%.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="text-center p-6"
                >
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-accent flex items-center justify-center shadow-glow"
                  >
                    <benefit.icon className="w-8 h-8 text-accent-foreground" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                Powered by Modern AI
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                We use cutting-edge natural language processing and machine learning to understand your content deeply.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {["Natural Language Processing", "Topic Modeling", "Semantic Analysis", "Knowledge Graphs", "Machine Learning"].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border border-border shadow-elevated p-12"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              Ready to Experience It?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Try LearningMap now and see how your content transforms into structured knowledge.
            </p>
            <Link to="/upload">
              <Button variant="hero" size="xl" className="group">
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
